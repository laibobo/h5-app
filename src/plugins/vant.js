import 'vant/lib/index.css'
import {
  Button,
  Icon,
  AddressList,
  Form,
  Field,
  Cell,
  CellGroup,
  Grid,
  GridItem
} from 'vant'

export default (app) => {
  app
    .use(Button)
    .use(Icon)
    .use(AddressList)
    .use(Form)
    .use(Field)
    .use(Cell)
    .use(CellGroup)
    .use(Grid)
    .use(GridItem)
}
