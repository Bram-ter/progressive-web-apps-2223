import '../css/style.css'
import '../css/buttons.css'
import './3d.ts'
import onRouteChange from './modules/router'
import { logUser } from './modules/api'

onRouteChange()
logUser()