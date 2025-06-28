import type { TravelPlace } from '../types/TravelPlace';

export const mockTravelPlaces: TravelPlace[] = [
  {
    id: '1',
    name: 'Wat Umong',
    lat: 18.783636,
    long: 98.953588,
    image: 'https://cms.dmpcdn.com/travel/2020/11/03/9d45da30-1dbc-11eb-9275-d9e61fe8653e_original.jpg',
    description: 'It is a peaceful place for meditation and spiritual practice. Visitors can walk through the tunnels, take photos, and pay respect to the Buddha images enshrined within. The temple grounds are shaded by large trees, and during the rainy season, the old walls are beautifully covered with green moss, adding to the serene and lively atmosphere.',
    country: 'Thailand',
    rating: 4.6,
    distance: "~3.2km",
    tags: ["Culture", "Green", "PM2.5 free"]
  },
  {
    id: '2',
    name: 'Ang Kaew',
    lat: 18.8020,
    long: 98.9446,
    image: 'https://media.readthecloud.co/wp-content/uploads/2021/12/29133520/angkaew-11-750x500.jpg',
    description: 'This small reservoir features pleasant walking and jogging trails, along with benches and open grassy lawns ideal for relaxing or picnicking',
    country: 'Thailand',
    rating: 4.7,
    distance: "~3.4km",
    tags: ["Green", "PM2.5 free"]
  },
 {
    id: '3',
    name: 'Chiang Mai PAO Park',
    lat: 18.7979,
    long: 98.9876,
    image: 'https://media.nationthailand.com/uploads/images/contents/w1024/2024/11/NwBTfIZjeNeA3Ec98Sz2.webp?x-image-process=style/lg-webp',
    description: 'It is the new public park of Chiang Mai Province that has quickly become popular as a beautiful place for relaxation and exercise. The park features a shady and natural atmosphere, along with stunning mountain views',
    country: 'Thailand',
    rating: 4.7,
    distance: "~6.3km",
    tags: ["Green", "PM2.5 free"]
  },

  {
    id: '4',
    name: 'Mae Kha Canal',
    lat: 18.7881,
    long: 98.9936,
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0e/cd/b2/caption.jpg?w=900&h=500&s=1',
    description: 'Mae Kha Canal is an ancient canal that holds significant historical importance and plays a vital role in the way of life of Chiang Mai city. Originally, it served as both the outer moat of the city and a drainage system',
    country: 'Thailand',
    rating: 4.2,
    distance: "~5.8km",
    tags: ["Culture", "Green"]
  },
  {
    id: '5',
    name: 'Ginger Farm',
    lat: 18.6672,
    long: 98.9645,
    image: 'https://images.squarespace-cdn.com/content/v1/5dcac1b37b75f56509c0a367/c96597eb-4afc-4346-b33c-1669a5281cd4/DSC00016.jpg',
    description: 'A full-service organic farm located in Chiang Mai Province offering a variety of activities for children and families, such as vegetable planting, egg collecting, rice planting, harvesting, threshing, cooking, making traditional Thai desserts, clay molding, and kids yoga',
    country: 'Thailand',
    rating: 4.5,
    distance: "~13.5km",
    tags: ["Green", "Culture", "PM2.5 free"]
  },
 {
    id: '6',
    name: 'Hor Kham Luang',
    lat: 18.752879,
    long: 98.922341,
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Ho_Kum_Luang_%28I%29.jpg',
    description: 'An elegant Lanna-style architecture, the building is a two-story half-wood, half-brick structure painted in reddish-brown. It stands proudly on a hill, covering an area of approximately 3,000 square meters amidst more than 470 rai of land at the Chiang Mai Royal Agricultural Research Center',
    country: 'Thailand',
    rating: 4.7,
    distance: "~10.7km",
    tags: ["Culture", "Green", "PM2.5 free"]
  },
   {
    id: '7',
    name: 'One Nimman',
    lat: 18.80015771106662,
    long: 98.96756289999999,
    image: 'https://res.cloudinary.com/pillarshotels/image/upload/f_auto/web/cms/resources/attractions/on-03-1500x1000-w1800h1360.jpeg',
    description: 'Discover One Nimman Select—a vibrant treasure trove of Thai designer pieces, local crafts, and unique Chiang Mai souvenirs, all handpicked for quality and charm, right in the heart of Nimman.',
    country: 'Thailand',
    rating: 4.5,
    distance: "~750m",
    tags: ["Street", "Culture"]
  },
 {
    id: '8',
    name: 'Think Park',
    lat: 18.80140939691727, 
    long: 98.96754306673772,
    image: 'https://changpuakmagazine.com/images/article/182925ArticleThumpnai_September2018-07-07_resize.jpg',
    description: 'Think Park is Chiang Mai’s first art-inspired open-air shopping hub, where trendy cafés, unique local boutiques, and a vibrant night market come together to offer handmade crafts, stylish fashion, and live music in a creative, youthful atmosphere.',
    country: 'Thailand',
    rating: 4.3,
    distance: "~1km",
    tags: ["Street", "Culture"]
  },
  {
    id: '10',
    name: 'สุกี้ช้างเผือก',
    lat: 18.79580688165689,
    long: 98.9853312120712,
    image: 'https://d13q9rhbndrrl0.cloudfront.net/posts/none/2021/8/1640512803955-655157687290318600.jpeg',
    description: 'ร้านสุกี้ช้างเผือกสาขาตลาดโต้รุ่งเป็นหนึ่งในร้านสตรีทฟู้ดเจ้าดังที่อยู่คู่ขวัญชาวเชียงใหม่มานาน ความพิเศษของสุกี้ร้านนี้คือ สุกี้แห้งที่หอมกลิ่นกระทะ รวมถึงปริมาณเครื่องที่ให้มาแบบจัดเต็มในราคาที่จับต้องได้ จึงนับว่าเป็นหนึ่งในของเด็ดของดีที่ต้องได้มาลองสักครั้งของเชียงใหม่',
    country: 'Thailand',
    rating: 4.5,
    distance: "~2.2km",
    tags: ["Street", "Culture"]
  },
  {
    id: '11',
    name: 'Khao-Sō-i ข้าวโซอิ',
    lat: 18.80914056385872,
    long: 99.00475884526325,
    image: 'https://media.readthecloud.co/wp-content/uploads/2021/11/29140911/khao-so-i-31-750x500.jpg',
    description: 'ร้าน Khao-Sō-i ข้าวโซอิ แม้จะพึ่งตั้งได้ไม่นานแต่ด้วยความร่อยหนึบนุ่มของเส้นข้าวซอยสดที่โชว์กระบวนวิธีการทำให้ดูต่อหน้า น้ำซุปเข้มข้นตามต้นตำรับ และการตกแต่งร้านสไตล์ญี่ปุ่น เรียกได้ว่าแทบจะพลิกโฉมการทานข้าวซอยแบบปกติของเราไปเลยทีเดียว',
    country: 'Thailand',
    rating: 4.8,
    distance: "~6.8km",
    tags: ["Street", "Culture"]
  },
  {
    id: '12',
    name: 'Mae Sai Khao Soi Restaurant',
    lat: 18.7997, 
    long: 98.9751,
    image: 'https://www.mytravelbuzzg.com/wp-content/uploads/Khao-Soi-Mae-Sai-Restaurant-e1693473350860.jpg',
    description: 'The highlight is the rich, aromatic Khao Soi curry soup, well-rounded flavor, not too oily, and the noodles are just the right amount of soft.',
    country: 'Thailand',
    rating: 4.5,
    distance: "~500m",
    tags: ["Street", "Culture"]
  },
  {
    id: '13',
    name: 'Chang Kei Hong Kong-style breakfast Chiang Maid City',
    lat: 18.7903, 
    long: 98.9785,
    image: 'https://images.chiangmaicitylife.com/clg/wp-content/uploads/2018/09/BF-1.jpg?auto=format&crop=entropy&fit=crop&fm=jpg&h=597&q=45&w=1140&s=2adf2b2176387a5634a858503e82b6be',
    description: 'Historic walled city with ancient temples and culture',
    country: 'Thailand',
    rating: 4.8,
    distance: "~2km",
    tags: ["Street", "Culture"]
  },
]