package main

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

func (a *App) domready(ctx context.Context) {
	runtime.EventsOn(ctx, "handle_select_plugin", func(optionalData ...interface{}) {
		OpenPluginFolder()
	})
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// func showNotification(title, message, nottype string) {
// 	runtime.EventsEmit(mainApp.ctx, "notification", )
// }
