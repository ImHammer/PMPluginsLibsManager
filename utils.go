package main

import (
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
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

func fileExists(file string) bool {
	if _, err := os.Stat(file); os.IsNotExist(err) {
		return false
	}

	return true
}

func getProjectMainPath(project *Project) string {
	if project.PluginInfo.Main == "" {
		return ""
	}

	splitedPath := strings.Split(project.PluginInfo.Main, "\\")
	mainPath := filepath.Join(project.Directory, "src")

	for _, path := range splitedPath {
		mainPath = filepath.Join(mainPath, path)
	}

	if mainPath == project.Directory {
		return ""
	}

	mainPath += ".php"
	return mainPath
}

func getProjectMainPackage(project *Project) string {
	if project.PluginInfo.Main == "" {
		return ""
	}

	regex, err := regexp.Compile(`([\W\w]+)[\\]`)
	if err != nil {
		return ""
	}

	result := regex.FindString(project.PluginInfo.Main)
	return result[:len(result)-1]
}

