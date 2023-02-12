package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	jsoniter "github.com/json-iterator/go"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type LibConfig struct {
	Name              string
	Version           string
	Namespace         string
	ExternalDirectory string
}

type App struct {
	ctx          context.Context
	ExternalLibs []LibConfig
}

func (a *App) domready(ctx context.Context) {
	runtime.EventsOn(ctx, "handle_select_plugin", func(optionalData ...interface{}) {
		OpenPluginFolder()
	})
	runtime.EventsOn(ctx, "request_back_lib_directory", func(optionalData ...interface{}) {
		HandleSelectLib(ctx)
	})
	runtime.EventsOn(ctx, "request_back_complete_add_library", func(optionalData ...interface{}) {
		newLib := &LibExternalInfo{}
		newLibDataFromFront := optionalData[0].(string)

		err := jsoniter.Unmarshal([]byte(newLibDataFromFront), newLib)
		if err != nil {
			log.Fatalln(err)
			return
		}

		project.NewLibForAdd = LibExternalInfo{}
		project.NewLibs = append(project.NewLibs, *newLib)
	})
	runtime.EventsOn(ctx, "request_back_update_remove_libs", func(optionalData ...interface{}) {
		project.RemoveLibs = make([]LibExternalInfo, 0)

		for _, libName := range optionalData {
			libInfo := project.Libs[libName.(string)]

			libExternalInfo := LibExternalInfo{}
			libExternalInfo.LibInfo = libInfo
			libExternalInfo.Directory = project.getLibDirectory(libInfo.Name)

			project.RemoveLibs = append(project.RemoveLibs, libExternalInfo)
		}
	})
	runtime.EventsOn(ctx, "request_back_save_project", func(optionalData ...interface{}) {
		project.save()
	})
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func NewApp() *App {
	return &App{
		ExternalLibs: make([]LibConfig, 0),
	}
}

func HandleSelectLib(ctx context.Context) {
	directory, err := runtime.OpenDirectoryDialog(ctx, runtime.OpenDialogOptions{
		Title: "Selecionar diretorio da livraria",
	})

	if err != nil {
		return
	}

	project.NewLibForAdd = LibExternalInfo{}
	project.NewLibForAdd.Directory = directory

	pluginConfig := filepath.Join(directory, "plugin.yml")
	if fileExists(pluginConfig) {
		pluginInfo := &PluginInfo{}
		err := loadYml(pluginInfo, pluginConfig)
		if err != nil {
			return
		}

		project.NewLibForAdd.Name = strings.ReplaceAll(pluginInfo.Name, " ", "")
		project.NewLibForAdd.Version = pluginInfo.Version
		project.NewLibForAdd.Namespace = getPluginMainNamespace(pluginInfo.Main)
		project.NewLibForAdd.IsPlugin = true
	}

	newLibForAddBytes, err := jsoniter.Marshal(project.NewLibForAdd)
	if err != nil {
		return
	}

	fmt.Println("COMO ESTA INDO: ", string(newLibForAddBytes))

	runtime.EventsEmit(mainApp.ctx, "response_back_lib_directory", string(newLibForAddBytes))
}

func CancelledLoading(err error) {
	if err != nil {
		log.Fatalln(err)
	}
	runtime.EventsEmit(mainApp.ctx, "loading_plugin", false)
}

func OpenPluginFolder() {
	directory, result := handleSelectPluginFile()
	runtime.EventsEmit(mainApp.ctx, "loading_plugin", true)

	var err error
	if result {
		if pluginInfo, err := loadPluginInfo(filepath.Join(directory, "plugin.yml")); err == nil {

			// PROJETO INICIADO
			startProject(*pluginInfo, directory)

			mainFile := ParseMainDirectory(directory, pluginInfo.Main)
			libsDirectory := filepath.Join(filepath.Dir(mainFile), LIBS_DIRECTORY_PREFIX)

			libsDataInfo := &LibsInfo{
				Libraries: make([]LibInfo, 0),
				Updated:   ParseActualDataString(),
			}

			if fileExists(libsDirectory) {
				libsInfoFile, err := os.Open(filepath.Join(libsDirectory, "libs.json"))
				check(err)

				bytes := make([]byte, 4096)
				len, err := libsInfoFile.Read(bytes)
				check(err)

				err = jsoniter.Unmarshal(bytes[:len], libsDataInfo)
				check(err)

				for _, v := range libsDataInfo.Libraries {
					v.LibStatus = LIB_STATUS_NATIVE
					project.addLib(v)
				}
			}
			project.sendPluginInfos()
			return
		}
	}
	CancelledLoading(err)

	// 	/// ENVIAR PARA O FRONTEND (Diretorio, Nome, Versão e API)
	// 	pluginInfo, err := loadPluginInfo(filepath.Join(directory, "plugin.yml"))
	// 	if err != nil {
	// 		CancelledLoading(err)
	// 		return
	// 	}

	// 	mainFile := ParseMainDirectory(directory, pluginInfo.Main)
	// 	libsDirectory := filepath.Join(filepath.Dir(mainFile), "pmlibs")

	// 	err = os.MkdirAll(libsDirectory, os.ModePerm)
	// 	if err != nil {
	// 		CancelledLoading(err)
	// 		return
	// 	}

	// 	libsFileInfo := filepath.Join(libsDirectory, "libs.yml")
	// 	libsDataInfo := &LibsInfo{
	// 		Libraries: make([]LibInfo, 0),
	// 		Updated:   ParseActualDataString(),
	// 	}
	// 	if fileExists(libsFileInfo) {
	// 		err = loadYml(libsDataInfo, libsFileInfo)
	// 		if err != nil {
	// 			CancelledLoading(err)
	// 			return
	// 		}
	// 	} else {
	// 		file, err := os.Create(libsFileInfo)
	// 		if err != nil {
	// 			CancelledLoading(err)
	// 			return
	// 		}

	// 		bytes, err := yaml.Marshal(libsDataInfo)
	// 		if err != nil {
	// 			CancelledLoading(err)
	// 			return
	// 		}

	// 		file.Write(bytes)
	// 		fmt.Println("ARQUIVO libs.yml CRIADO")
	// 	}

	// 	librariesStringifyBytes, err := json.Marshal(libsDataInfo.Libraries)
	// 	if err != nil {
	// 		CancelledLoading(err)
	// 		return
	// 	}

	// 	librariesStringify := string(librariesStringifyBytes)
	// 	fmt.Println("TESTANDO: " + string(librariesStringify))

	// 	CancelledLoading(nil)

	// 	runtime.EventsEmit(
	// 		mainApp.ctx,
	// 		"plugin",
	// 		string(directory),
	// 		string(pluginInfo.Name),
	// 		string(pluginInfo.Version),
	// 		string(pluginInfo.Api),
	// 		librariesStringify,
	// 	)
	// }
}
