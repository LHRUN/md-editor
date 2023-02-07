import { LINE_STATUS, TEXT_STATUS } from '@/utils/constants'
import BoldIcon from '../icons/bold'
import DeleteIcon from '../icons/delete'
import ItalicIcon from '../icons/italic'
import UnderlineIcon from '../icons/underline'
import OlIcon from '../icons/ol'
import UlIcon from '../icons/ul'
import TodoIcon from '../icons/todo'
import QuoteIcon from '../icons/quote'

export const textConfig = [
  {
    icon: <BoldIcon />,
    status: TEXT_STATUS.STRONG
  },
  {
    icon: <DeleteIcon />,
    status: TEXT_STATUS.DELETE
  },
  {
    icon: <ItalicIcon />,
    status: TEXT_STATUS.ITALIC
  },
  {
    icon: <UnderlineIcon />,
    status: TEXT_STATUS.UNDERLINE
  }
]

export const lineConfig = [
  {
    icon: <OlIcon />,
    status: LINE_STATUS.OL
  },
  {
    icon: <UlIcon />,
    status: LINE_STATUS.UL
  },
  {
    icon: <TodoIcon />,
    status: LINE_STATUS.TODO
  },
  {
    icon: <QuoteIcon />,
    status: LINE_STATUS.QUOTE
  }
]
