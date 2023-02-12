package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var mainApp *App

type Slapow struct {
	Name string `json:"name"`
}

func main() {
	// Create an instance of the app structure
	app := NewApp()
	mainApp = app

	// appMenu := createMenu()

	// Create application with options
	err := wails.Run(&options.App{
		Title:         "Manuseador de livrarias / Plugins PocketMine-MP",
		MinWidth:      840,
		MinHeight:     480,
		MaxWidth:      840,
		MaxHeight:     480,
		DisableResize: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 255, A: 1},
		OnStartup:        app.startup,
		OnDomReady:       app.domready,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
