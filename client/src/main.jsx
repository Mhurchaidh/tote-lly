import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './context/user'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SiteProvider } from './context/site'
import { StoreProvider } from './context/store'
import { CategoryProvider } from './context/categories'
import { FilterProvider } from './context/filter'
import { ListingProvider } from './context/listing'
import { OptionProvider } from './context/option'
import { DragDropContext } from 'react-beautiful-dnd';
import { SoldItemProvider } from './context/solditems'
import { SearchProvider } from './context/search'
import { StatsProvider } from './context/stats'
import { CategoryFilterProvider } from './context/categoryfilter'

const onDragEnd = result => {
  console.log(result)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ListingProvider>
        <SoldItemProvider>
        <SiteProvider>
          <StoreProvider>
            <CategoryProvider>
              <FilterProvider>
                <OptionProvider>
                  <SearchProvider>
                    <CategoryFilterProvider>
                    <StatsProvider>
                <DragDropContext onDragEnd={onDragEnd}>
                  <App />
                </DragDropContext>
                </StatsProvider>
                </CategoryFilterProvider>
                </SearchProvider>
                </OptionProvider>
              </FilterProvider>
            </CategoryProvider>
          </StoreProvider>
        </SiteProvider>
        </SoldItemProvider>
        </ListingProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
