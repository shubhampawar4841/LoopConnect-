import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, LinkIcon, Calendar } from 'lucide-react'

interface ProfileSectionProps {
  coverImage: string
  profileImage: string
  name: string
  username: string
  bio: string
  location: string
  website: string
  joinDate: string
  posts: number
  followers: number
  following: number
}

export default function ProfileSection({
  coverImage,
  profileImage,
  name = '', // Default fallback if 'name' is not provided
  username,
  bio,
  location,
  website = '', // Default fallback if 'website' is not provided
  joinDate,
  posts,
  followers,
  following
}: ProfileSectionProps) {
  // Ensure 'website' is a string before calling replace
  const formattedWebsite = website ? website.replace(/^https?:\/\//, '') : 'No website provided';

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={coverImage} alt="Cover" className="w-full object-cover" />
      </div>
      <CardContent className="relative pt-12 px-4 sm:px-6">
        <Avatar className="absolute -top-16 left-4 sm:left-6 w-32 h-32 border-4 border-background">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : 'NN'}</AvatarFallback>
        </Avatar>
        <div className="flex justify-end mb-4">
          <Button variant="outline">Edit profile</Button>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">@{username}</p>
        </div>
        <p className="mt-3">{bio}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <LinkIcon className="mr-2 h-4 w-4" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {formattedWebsite}
            </a>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Joined {joinDate}</span>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div>
            <span className="font-bold">{posts}</span>{" "}
            <span className="text-muted-foreground">Posts</span>
          </div>
          <div>
            <span className="font-bold">{followers}</span>{" "}
            <span className="text-muted-foreground">Followers</span>
          </div>
          <div>
            <span className="font-bold">{following}</span>{" "}
            <span className="text-muted-foreground">Following</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
