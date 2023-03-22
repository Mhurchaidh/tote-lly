import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/user'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SiteProvider } from './context/site'
import { StoreProvider } from './context/store'
import { CategoryProvider } from './context/category'
import { FilterProvider } from './context/filter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SiteProvider>
          <StoreProvider>
            <CategoryProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </CategoryProvider>
          </StoreProvider>
        </SiteProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
