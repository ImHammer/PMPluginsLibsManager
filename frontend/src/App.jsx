
import { createHashRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Plugins from './pages/Plugins';
import Libs from './pages/Libs';

const Router = createHashRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "plugins",
                element: <Plugins/>
            },
            {
                path: "libs",
                element: <Libs/>
            }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router}/>
}