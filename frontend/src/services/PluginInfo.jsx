
import { createContext } from "react"

const PluginInfoContext  = createContext({
    name: "Pocketmine",
    version: "1.0.0",
    api: "3.0.0"
})

export {
    PluginInfoContext
}
