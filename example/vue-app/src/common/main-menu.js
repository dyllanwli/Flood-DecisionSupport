import menuManager from '@/support/menu-manager'
import appConfig from '@/config/app-config'
import store from '@/store/store'
import main from '@/main'

/**
 * Load the primary menu by its slug defined app config
 * from remote server and then run the local customization over it
 */
const loadItems = () => {
  return new Promise((resolve, reject) => {
    if (appConfig.appMenu.useORSMenu) {
      menuManager.getMenu(appConfig.appMenu.mainMenuId).then((menu) => {
        resolve(menu)
      }).catch(error => {
        console.error(error)
        resolve([])
      })
    } else {
      let expectedPromise = main.getInstance().appHooks.run('loadMenuItems')
      if (expectedPromise instanceof Promise) {
        expectedPromise.then((result) => {
          resolve(result)
        }).catch (err => {
          console.log(err)
        })
      } else {
        resolve([])
      }      
    }
  })
}

const adjustMenu = () => {
  console.log(main)
  main.getInstance().appHooks.run('modifyMenu', store.getters.mainMenu)
}

/**
 * Return Main menu
 */
const MainMenu = {
  loadItems,
  adjustMenu
}

export default MainMenu
