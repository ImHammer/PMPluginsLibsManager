package main

import (
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func validatePluginDirectory(directory string) bool {
	directory = path.Clean(directory)
	if _, err := os.Stat(directory); os.IsNotExist(err) {
		return false
	}
	pluginInfoFilePath := filepath.Join(directory, "plugin.yml")
	pluginSrcPath := filepath.Join(directory, "src")

	if _, err := os.Stat(pluginInfoFilePath); os.IsNotExist(err) {
		return false
	}
	if _, err := os.Stat(pluginSrcPath); os.IsNotExist(err) {
		return false
	}

	return true
}

type DirectoryTree struct {
	Basename    string                 `json:"basename"`
	Directories map[string]interface{} `json:"directories"`
	Files       []string               `json:"files"`
}

func check(err error) {
	if err != nil {
		// panic(err)
		fmt.Println(err)
	}
}

func makeDirectoryTree(directory string) DirectoryTree {
	tree := DirectoryTree{}

	tree.Basename = filepath.Base(directory)
	tree.Directories = make(map[string]interface{})
	tree.Files = make([]string, 0)

	internalFiles, err := filepath.Glob(filepath.Join(directory, "*"))
	if err == nil {
		for _, internal := range internalFiles {
			internalBaseName := filepath.Base(internal)
			if fileInfoInternal, err := os.Stat(internal); err == nil {
				if fileInfoInternal.IsDir() {
					tree.Directories[internalBaseName] = makeDirectoryTree(internal)
				} else {
					tree.Files = append(tree.Files, internalBaseName)
				}
			}
		}
	}

	return tree
}

func getAllPHPFiles(directory string) []string {
	phpFiles := make([]string, 0)

	internalFiles, err := filepath.Glob(filepath.Join(directory, "*"))
	if err == nil {
		for _, internal := range internalFiles {
			file, err := os.Open(internal)
			if err != nil {
				continue
			}

			fileInfo, err := file.Stat()
			if err != nil {
				continue
			}

			if fileInfo.IsDir() {
				phpFiles = append(phpFiles, getAllPHPFiles(internal)...)
			} else {
				extension := filepath.Ext(internal)
				if extension == ".php" {
					phpFiles = append(phpFiles, internal)
				}
			}
		}
	} else {
		check(err)
	}

	return phpFiles
}

func fileExists(file string) bool {
	if _, err := os.Stat(file); os.IsNotExist(err) {
		return false
	}

	return true
}

func handleSelectPluginFile() (directory string, result bool) {
	dir, err := runtime.OpenDirectoryDialog(mainApp.ctx, runtime.OpenDialogOptions{
		Title: "Abrir pasta do plugin",
	})

	result = false

	if err != nil {
		return
	}

	if !validatePluginDirectory(dir) {
		if len(dir) > 0 {
			runtime.MessageDialog(mainApp.ctx, runtime.MessageDialogOptions{
				Title:   "ERROR",
				Message: "Não foi possivel validar o diretorio do plugin!",
			})
		}

		return
	}

	result = true
	directory = dir
	return
}

func ParseMainDirectory(base, main string) string {
	splitedPath := strings.Split(main, "\\")
	mainPath := filepath.Join(base, "src")

	for _, path := range splitedPath {
		mainPath = filepath.Join(mainPath, path)
	}

	return mainPath + ".php"
}

func ParseActualDataString() string {
	return time.Now().Format("02-01-2006")
}

func getPluginMainNamespace(main string) string {
	splitedMAin := strings.Split(main, "\\")

	namespace := ""
	for i, part := range splitedMAin {
		if i < (len(splitedMAin) - 1) {
			namespace += part + "\\"
		}
	}

	return namespace[:len(namespace)-1]
}
