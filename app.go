package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}
