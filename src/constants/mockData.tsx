import {
  Bell,
  Camera,
  CircleUserRound,
  House,
  SendHorizontal,
  Settings,
  SquarePlus
} from 'lucide-react'

//Types
import { NavItem } from '@/types'

export const navItems: NavItem[] = [
  {
    name: 'Home',
    link: '/',
    icon: (props) => <House {...props} />
  },
  {
    name: 'Add Photos',
    link: '/post',
    icon: (props) => <SquarePlus {...props} />
  },
  {
    name: 'My Photos',
    link: '/myphotos',
    icon: (props) => <Camera {...props} />
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: (props) => <CircleUserRound {...props} />
  },
  {
    name: 'Notifications',
    link: '#',
    icon: (props) => <Bell {...props} />
  },
  {
    name: 'Direct',
    link: '#',
    icon: (props) => <SendHorizontal {...props} />
  },
  {
    name: 'Settings',
    link: '#',
    icon: (props) => <Settings {...props} />
  }
]