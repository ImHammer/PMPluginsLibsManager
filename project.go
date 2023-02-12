package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	jsoniter "github.com/json-iterator/go"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/exp/maps"
)

// const LIBS_DIRECTORY_PREFIX = "pmlibs"
// const LIB_STATUS_ADDED = "added_lib"

const (
	LIBS_DIRECTORY_PREFIX = "pmlibs"

	LIB_STATUS_ADDED   LibStatus = "added_lib"
	LIB_STATUS_REMOVED LibStatus = "removed_lib"
	LIB_STATUS_NATIVE  LibStatus = "native_lib"
)

type LibStatus string

type LibInfo struct {
	Name      string    `json:"name"`
	Version   string    `json:"version"`
	Namespace string    `json:"namespace"`
	LibStatus LibStatus `json:"lib_status"`
}

type LibsInfo struct {
	Libraries []LibInfo `json:"libraries"`
	Updated   string    `json:"updated"`
}

type LibExternalInfo struct {
	LibInfo
	HasChanges bool   `json:"hasChanges"`
	IsPlugin   bool   `json:"isPlugin"`
	Directory  string `json:"directory"`
}

type Project struct {
	Plugin        PluginInfo
	Directory     string
	LibsDirectory string

	Libs map[string]LibInfo

	NewLibs    []LibExternalInfo
	RemoveLibs []LibExternalInfo

	NewLibForAdd LibExternalInfo
}

func (p *Project) sendPluginInfos() {
	var err error

	pluginEncodedBytes, err := jsoniter.Marshal(p.Plugin)
	if err == nil {
		libsEncodedBytes, err := jsoniter.Marshal(maps.Values(p.Libs))
		if err == nil {
			runtime.EventsEmit(mainApp.ctx, "start_project", string(pluginEncodedBytes), string(libsEncodedBytes))
			return
		}
	}

	fmt.Println(err.Error())
}

func (p *Project) addLib(lib LibInfo) {
	p.Libs[lib.Name] = lib
}

func (p *Project) handleUpdateLibs() {
	os.MkdirAll(p.LibsDirectory, os.ModePerm)

	file, err := os.Create(filepath.Join(p.LibsDirectory, "libs.json"))
	check(err)

	libsInfoData := &LibsInfo{}
	libsInfoData.Updated = ParseActualDataString()
	libsInfoData.Libraries = maps.Values(p.Libs)

	jsonData, err := jsoniter.Marshal(libsInfoData)
	check(err)

	file.WriteString(string(jsonData))
	defer file.Close()

	libsDataStr, err := jsoniter.Marshal(p.Libs)
	check(err)

	runtime.EventsEmit(mainApp.ctx, "stf_update_libs", string(libsDataStr))
}

func (p *Project) handleRemoveLibs() {
	forRemoveLibs := ArrayMap(p.RemoveLibs, func(lib LibExternalInfo) string {
		if fileExists(lib.Directory) {
			os.RemoveAll(lib.Directory)
		}
		return lib.Name
	})
	ArrayMap(forRemoveLibs, func(libName string) string {
		delete(p.Libs, libName)
		return libName
	})
}

func (p *Project) handleAddLibs() {
	ArrayMap(p.NewLibs, func(lib LibExternalInfo) bool {
		hasErrors := false
		if fileExists(lib.Directory) {
			libArchivesDirectory := lib.Directory
			if lib.IsPlugin {
				libArchivesDirectory = filepath.Join(libArchivesDirectory, "src")
			}

			/// CRIANDO O DIRETORIO DA LIB
			libDirName := strings.ToLower("lib" + lib.Name)
			// libPath := filepath.Join(p.LibsDirectory, libDirName)
			libPath := p.getLibDirectory(lib.Name)
			os.MkdirAll(libPath, os.ModePerm)

			// NAMESPACE PARA OS ARQUIVOS
			libFileNamespace := getPluginMainNamespace(p.Plugin.Main)
			libFileNamespace = libFileNamespace + "\\" + LIBS_DIRECTORY_PREFIX + "\\" + libDirName

			libFiles := getAllPHPFiles(libArchivesDirectory)
			for _, libFile := range libFiles {
				file, err := os.Open(libFile)
				if err != nil {
					hasErrors = true
					return false
				}

				fileInfo, err := file.Stat()
				if err != nil {
					hasErrors = true
					return false
				}

				fileName := fileInfo.Name()

				fileScanner := bufio.NewScanner(file)
				fileScanner.Split(bufio.ScanLines)

				fileLines := make([]string, 0)
				for fileScanner.Scan() {
					fileLine := fileScanner.Text()

					if strings.Contains(fileLine, "namespace") {
						// IS NAMESPACE LINE
						fileLines = append(fileLines, "namespace "+libFileNamespace+";")
					} else if strings.Contains(fileLine, "use") && strings.Contains(fileLine, lib.Namespace) {
						// IS USE IMPORTING ONE FILE FROM LIB
						continue
					} else {
						fileLines = append(fileLines, fileLine)
					}
				}

				newFileData := strings.Join(fileLines, "\n")

				newFile, err := os.Create(filepath.Join(libPath, fileName))
				if err != nil {
					hasErrors = true
					return false
				}

				newFile.WriteString(string(newFileData))
			}
		} else {
			hasErrors = true
		}

		if !hasErrors {
			p.Libs[lib.Name] = lib.LibInfo
		}
		return true
	})

	// for _, lib := range p.NewLibs {
	// 	hasErrors := false
	// 	if fileExists(lib.Directory) {
	// 		libArchivesDirectory := lib.Directory
	// 		if lib.IsPlugin {
	// 			libArchivesDirectory = filepath.Join(libArchivesDirectory, "src")
	// 		}

	// 		/// CRIANDO O DIRETORIO DA LIB
	// 		libDirName := strings.ToLower("lib" + lib.Name)
	// 		// libPath := filepath.Join(p.LibsDirectory, libDirName)
	// 		libPath := p.getLibDirectory(lib.Name)
	// 		os.MkdirAll(libPath, os.ModePerm)

	// 		// NAMESPACE PARA OS ARQUIVOS
	// 		libFileNamespace := getPluginMainNamespace(p.Plugin.Main)
	// 		libFileNamespace = libFileNamespace + "\\" + LIBS_DIRECTORY_PREFIX + "\\" + libDirName

	// 		libFiles := getAllPHPFiles(libArchivesDirectory)
	// 		for _, libFile := range libFiles {
	// 			file, err := os.Open(libFile)
	// 			if err != nil {
	// 				hasErrors = true
	// 				return
	// 			}

	// 			fileInfo, err := file.Stat()
	// 			if err != nil {
	// 				hasErrors = true
	// 				return
	// 			}

	// 			fileName := fileInfo.Name()

	// 			fileScanner := bufio.NewScanner(file)
	// 			fileScanner.Split(bufio.ScanLines)

	// 			fileLines := make([]string, 0)
	// 			for fileScanner.Scan() {
	// 				fileLine := fileScanner.Text()

	// 				if strings.Contains(fileLine, "namespace") {
	// 					// IS NAMESPACE LINE
	// 					fileLines = append(fileLines, "namespace "+libFileNamespace+";")
	// 				} else if strings.Contains(fileLine, "use") && strings.Contains(fileLine, lib.Namespace) {
	// 					// IS USE IMPORTING ONE FILE FROM LIB
	// 					continue
	// 				} else {
	// 					fileLines = append(fileLines, fileLine)
	// 				}
	// 			}

	// 			newFileData := strings.Join(fileLines, "\n")

	// 			newFile, err := os.Create(filepath.Join(libPath, fileName))
	// 			if err != nil {
	// 				hasErrors = true
	// 				return
	// 			}

	// 			newFile.WriteString(string(newFileData))
	// 		}
	// 	} else {
	// 		hasErrors = true
	// 	}

	// 	if !hasErrors {
	// 		p.Libs[lib.Name] = lib.LibInfo
	// 	}
	// }

	// p.NewLibs = make([]LibExternalInfo, 0)
}

func (p *Project) save() {
	p.handleUpdateLibs()

	p.handleRemoveLibs()
	p.handleAddLibs()

	p.handleUpdateLibs()
}

func (p *Project) getLibDirectory(libName string) string {
	libDirName := strings.ToLower("lib" + libName)
	libPath := filepath.Join(p.LibsDirectory, libDirName)
	return libPath
}

var project *Project

func startProject(plugin PluginInfo, directory string) {
	project = &Project{
		Plugin:       plugin,
		Directory:    directory,
		Libs:         make(map[string]LibInfo),
		NewLibs:      make([]LibExternalInfo, 0),
		RemoveLibs:   make([]LibExternalInfo, 0),
		NewLibForAdd: LibExternalInfo{},
	}

	libsDirectory := filepath.Join(filepath.Dir(ParseMainDirectory(project.Directory, project.Plugin.Main)), "pmlibs")
	project.LibsDirectory = libsDirectory
}
