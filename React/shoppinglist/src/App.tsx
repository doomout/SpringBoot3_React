import AddItem from './AddItem';
import './App.css'
import { useState } from 'react';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export type Item = {
  product: string;
  amount: string;
}

function App() {
  // items 상태에 새 항목을 추가하는 함수
  const addItem = (item: Item) => {
    setItems([item, ...items]);
  }

  // 쇼핑 항목을 저장하는 상태
  const [items, setItems] = useState<Item[]>([]);

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">
              Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem}/>
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <ListItemText primary={item.product} secondary={item.amount} />
              </ListItem>
            )
          }
        </List>
      </Container>
    </>
  )
}

export default App
