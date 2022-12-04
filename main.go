package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS
var mainApp *App

func main() {
	// Create an instance of the app structure
	app := NewApp()
	mainApp = app

	appMenu := createMenu()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Manuseador de librarias / Plugins PocketMine-MP",
		Width:  1024,
		Height: 768,
		Menu:   appMenu,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

func createMenu() *menu.Menu {
	appMenu := menu.NewMenu()
	fileSubMenu := appMenu.AddSubmenu("Arquivo")
	fileSubMenu.AddText("Abrir plugin", keys.CmdOrCtrl("o"), func(cd *menu.CallbackData) {
		runtime.OpenDirectoryDialog(mainApp.ctx, runtime.OpenDialogOptions{
			Title: "Abrir pasta do plugin",
		})
	})
	return appMenu
}
