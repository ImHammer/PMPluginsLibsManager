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
	pluginInfo = &PluginInfo{}
	err = loadYml(pluginInfo, filePath)
	return
}

func loadYml(out interface{}, filePath string) error {
	pluginInfoBytes, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	err = yaml.Unmarshal(pluginInfoBytes, out)
	if err != nil {
		return err
	}

	return nil
}
