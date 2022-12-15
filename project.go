package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	jsoniter "github.com/json-iterator/go"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type ProjectLibs struct {
	Requireds []string `json:"requireds"`
}

type Project struct {
	PluginFolderName string
	PluginInfo       *PluginInfo

	Directory      string
	PluginInfoPath string
	MainFilePath   string
	MainPackage    string

	LibsPath       string
	LibsFileConfig string
	Libs           *ProjectLibs

	Sources DirectoryTree `json:"sources"`
}

func (p *Project) init() {
	fmt.Println("-> PROJECT INIT")

	p.PluginFolderName = filepath.Base(p.Directory)
	p.PluginInfoPath = filepath.Join(p.Directory, "plugin.yml")

	p.loadPluginInfo()

	p.MainFilePath = getProjectMainPath(p)
	p.MainPackage = getProjectMainPackage(p)
	p.Libs = &ProjectLibs{
		Requireds: make([]string, 0),
	}

	libsConfig := filepath.Join(p.Directory, "pm_libs.json")
	libsPath := filepath.Join(filepath.Dir(p.MainFilePath), "libs")

	if !fileExists(libsConfig) {
		file, err := os.Create(libsConfig)
		if err != nil {
			return
		}
		projectLibsData, err := jsoniter.Marshal(p.Libs)
		if err != nil {
			return
		}
		file.Write(projectLibsData)
		file.Close()
	}

	if !fileExists(libsPath) {
		os.Mkdir(libsPath, 0755)
	}

	p.loadSources()
	p.loadLibraries()
}

func (p *Project) loadPluginInfo() {
	fmt.Println("-> LOADING plugin.yml...")

	pluginInfo, err := loadPluginInfo(p.PluginInfoPath)

	if err != nil {
		fmt.Println("- NÃO FOI POSSIVEL CARREGAR A plugin.yml")
		log.Fatalln(err)
		return
	}

	p.PluginInfo = pluginInfo
	fmt.Println("- LOADED plugin.yml...")
}

func (p *Project) loadSources() {
	fmt.Println("-> LOADING PLUGIN SOURCES ...")
	p.Sources = makeDirectoryTree(p.Directory)
	fmt.Println("- LOADED PLUGIN SOURCES ...")
}

func (p *Project) loadLibraries() {
	fmt.Println("-> LOADING PLUGIN SOURCES ...")

	for _, libName := range p.Libs.Requireds {
		libName = strings.ToLower(libName)
		libPath := filepath.Join(p.LibsPath, libName)
		if fileExists(libPath) {

		} else {
			fmt.Println("REQUIRED LIB WITH NAME", libName, "NOT FOUND!")
		}
	}

	fmt.Println("- LOADED PLUGIN SOURCES ...")
}

func OpenPluginFolder() {
	directory, result := handleSelectPluginFile()
	if result {
		project = CreateProject(directory)
		project.init()

		// fmt.Println("SLAPOW", filepath.Join(project.MainFilePath, ".."))
		pluginInfoData, err := jsoniter.Marshal(project.PluginInfo)
		if err != nil {
			log.Fatalln(err)
			return
		}

		sourcesData, err := jsoniter.Marshal(project.Sources)
		if err != nil {
			log.Fatalln(err)
			return
		}

		runtime.EventsEmit(mainApp.ctx, "plugin_data", string(pluginInfoData), string(sourcesData))
	}
}

func CreateProject(directory string) *Project {
	return &Project{
		Directory: directory,
	}
}
