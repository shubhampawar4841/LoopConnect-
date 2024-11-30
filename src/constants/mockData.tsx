export const navItems: NavItem[] = [
  {
    name: 'Home',
    link: '/',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <House {...props} />
  },
  {
    name: 'Add Photos',
    link: '/post',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <SquarePlus {...props} />
  },
  {
    name: 'My Photos',
    link: '/myphotos',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <Camera {...props} />
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <CircleUserRound {...props} />
  },
  {
    name: 'Notifications',
    link: '#',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <Bell {...props} />
  },
  {
    name: 'Direct',
    link: '#',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <SendHorizontal {...props} />
  },
  {
    name: 'Settings',
    link: '#',
    icon: (props?: React.SVGProps<SVGSVGElement>) => <Settings {...props} />
  }
]
