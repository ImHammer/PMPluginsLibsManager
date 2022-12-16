
package main

import (
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type NotifyType string

const (
	DANGER NotifyType = iota 
	WARNING
	INFO
)

func (n NotifyType) String() string {
	switch(n) {
	case DANGER:
		return "danger"
	case WARNING:
		return "warning"
	case INFO:
		return "success"
	}

	return ""
}

func sendNotification(title, message string, ntype NotfyType) {
	runtime.EventsEmit(mainApp.ctx, "notifications", title, message, ntype.String())
}