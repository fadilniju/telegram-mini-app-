'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Zap, User, ShoppingBag, Image as ImageIcon, Palette, Search, Gift } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user?: {
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
      };
    };
  }
}

export default function ExampleProfile() {
  const [activeTab, setActiveTab] = useState('profile')
  const [modelSize, setModelSize] = useState('512x512')
  const [imageCount, setImageCount] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [generationModel, setGenerationModel] = useState('stable-diffusion')
  const [nftActiveTab, setNftActiveTab] = useState('collection')
  const [user, setUser] = useState<{
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
} | null>(null);
  const [level] = useState(0)
  const [experience] = useState(0)

  useEffect(() => {
    const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
    if (telegramUser) {
      setUser(telegramUser);
    }
  }, []);

  const generatedImages = [
    "/placeholder.svg?height=100&width=100&text=Изображение1",
    "/placeholder.svg?height=100&width=100&text=Изображение2",
    "/placeholder.svg?height=100&width=100&text=Изображение3",
    "/placeholder.svg?height=100&width=100&text=Изображение4",
  ];

  const nftCollection = [
    { id: 1, name: "Космический Тонкот", price: "10 TON", category: "Искусство" },
    { id: 2, name: "Цифровой Тонпейзаж", price: "5 TON", category: "Пейзажи" },
    { id: 3, name: "ТОНстрактное искусство", price: "15 TON", category: "Абстракция" },
    { id: 4, name: "ТОНкен", price: "8 TON", category: "Коллекционные" },
  ];

  const nftMarketplace = [
    { id: 1, name: "Золотой ТОНкоин", price: "20 TON", creator: "cryptoartist" },
    { id: 2, name: "ТОНмонавт", price: "30 TON", creator: "spaceexplorer" },
    { id: 3, name: "ТОНландия", price: "25 TON", creator: "digitalworld" },
    { id: 4, name: "КриптоТОНчик", price: "15 TON", creator: "nftmaster" },
    { id: 5, name: "ТОНовая Волна", price: "18 TON", creator: "artwave" },
  ];

  const dailyRewards = [
    { day: 1, reward: "50 очков опыта" },
    { day: 2, reward: "100 очков опыта" },
    { day: 3, reward: "1 бесплатная генерация" },
    { day: 4, reward: "200 очков опыта" },
    { day: 5, reward: "2 бесплатные генерации" },
    { day: 6, reward: "300 очков опыта" },
    { day: 7, reward: "1 случайный NFT" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {user && (
              <Card className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 border-4 border-white">
                      <AvatarImage src={user.photo_url} alt={user.first_name} />
                      <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name || ''}`}</h2>
                      <p className="text-lg">@{user.username || 'username'}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-5 h-5 mr-1 text-yellow-300" />
                        <span className="font-semibold">Уровень {level}</span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Gift className="h-6 w-6 text-yellow-300" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ежедневные награды</DialogTitle>
                          <DialogDescription>
                            Получайте награды каждый день, чтобы повысить свой уровень и получить бонусы!
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-7 gap-2 mt-4">
                          {dailyRewards.map((reward) => (
                            <div key={reward.day} className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${reward.day <= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {reward.day}
                              </div>
                              <span className="text-xs mt-1 text-center">{reward.reward}</span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Статистика
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Опыт</span>
                      <span>{experience} / 1000</span>
                    </div>
                    <Progress value={(experience / 1000) * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between">
                    <span>Сгенерировано изображений</span>
                    <Badge variant="secondary" className="text-xs">0</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Куплено товаров</span>
                    <Badge variant="secondary" className="text-xs">0</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2 text-blue-500" />
                  Галерея
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <Image 
                      key={index} 
                      src={image} 
                      alt={`Сгенерированное изображение ${index + 1}`} 
                      width={100} 
                      height={100}
                      className="w-full h-auto rounded-lg shadow-md" 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'store':
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Магазин</h3>
              <p>Здесь будет содержимое магазина.</p>
            </CardContent>
          </Card>
        );
      case 'generator':
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Генератор изображений</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Промпт</label>
                  <Textarea
                    placeholder="Опишите изображение, которое вы хотите сгенерировать"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Модель генерации</label>
                  <Select value={generationModel} onValueChange={setGenerationModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите модель генерации" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                      <SelectItem value="dall-e">DALL-E</SelectItem>
                      <SelectItem value="midjourney">Midjourney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Размер модели</label>
                  <Select value={modelSize} onValueChange={setModelSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите размер модели" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="256x256">256x256</SelectItem>
                      <SelectItem value="512x512">512x512</SelectItem>
                      <SelectItem value="1024x1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Количество изображений: {imageCount}</label>
                  <Slider
                    value={[imageCount]}
                    onValueChange={(value) => setImageCount(value[0])}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                </div>
                <Button className="w-full" disabled={!prompt}>Создать новое изображение</Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'nft':
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">NFT в TON</h3>
              <Tabs value={nftActiveTab} onValueChange={setNftActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="collection">Моя коллекция</TabsTrigger>
                  <TabsTrigger value="marketplace">Маркетплейс</TabsTrigger>
                </TabsList>
                <TabsContent value="collection">
                  <div className="space-y-4 mt-4">
                    {nftCollection.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <Badge>{item.price}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Создать NFT в TON</Button>
                </TabsContent>
                <TabsContent value="marketplace">
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Поиск NFT..." className="flex-grow" />
                      <Button size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    {nftMarketplace.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <p className="text-sm  text-gray-500">Создатель: {item.creator}</p>
                          </div>
                        </div>
                        <Button size="sm">{item.price}</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-gray-50 min-h-screen">
      <div className="mb-20">{renderContent()}</div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="flex justify-around max-w-md mx-auto p-2">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Профиль</span>
          </Button>
          <Button
            variant={activeTab === 'store' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('store')}
            className="flex flex-col items-center"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs mt-1">Магазин</span>
          </Button>
          <Button
            variant={activeTab === 'generator' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('generator')}
            className="flex flex-col items-center"
          >
            <ImageIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Генератор</span>
          </Button>
          <Button
            variant={activeTab === 'nft' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('nft')}
            className="flex flex-col items-center"
          >
            <Palette className="h-6 w-6" />
            <span className="text-xs mt-1">NFT</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
