package main

import (
	"os"

	"gopkg.in/yaml.v2"
)

type PluginInfo struct {
	Name        string                 `json:"name"`
	Version     string                 `json:"version"`
	Api         string                 `json:"api"`
	Main        string                 `json:"main"`
	Description string                 `json:"description"`
	Author      interface{}            `json:"author"`
	Authors     interface{}            `json:"authors"`
	Commands    map[string]interface{} `json:"commands"`
	Permissions map[string]interface{} `json:"permissions"`
}

func loadPluginInfo(filePath string) (pluginInfo *PluginInfo, err error) {

	pluginInfoBytes, err := os.ReadFile(filePath)
	if err != nil {
		return
	}

	loadedPluginInfoData := &PluginInfo{}

	err = yaml.Unmarshal(pluginInfoBytes, loadedPluginInfoData)
	if err != nil {
		return
	}

	pluginInfo = loadedPluginInfoData
	return
}
