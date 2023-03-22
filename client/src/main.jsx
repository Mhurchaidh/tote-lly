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
import { ListingProvider } from './context/listing'
import { OptionProvider } from './context/option'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ListingProvider>
        <SiteProvider>
          <StoreProvider>
            <CategoryProvider>
              <FilterProvider>
                <OptionProvider>
                <App />
                </OptionProvider>
              </FilterProvider>
            </CategoryProvider>
          </StoreProvider>
        </SiteProvider>
        </ListingProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
