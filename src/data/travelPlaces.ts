import type { TravelPlace } from '../types/TravelPlace';

export const mockTravelPlaces: TravelPlace[] = [
  {
    id: '1',
    name: 'Wat Umong',
    lat: 18.783636,
    long: 98.953588,
    image: 'https://en.wikipedia.org/wiki/Wat_Umong?utm_source=chatgpt.com',
    description: 'It is a peaceful place for meditation and spiritual practice. Visitors can walk through the tunnels, take photos, and pay respect to the Buddha images enshrined within. The temple grounds are shaded by large trees, and during the rainy season, the old walls are beautifully covered with green moss, adding to the serene and lively atmosphere.',
    country: 'Thailand',
    rating: 4.6,
    distance: "~3.2km"
  },
  {
    id: '2',
    name: 'Ang Kaew',
    lat: 18.8020,
    long: 98.9446,
    image: 'https://www.tripadvisor.com/LocationPhotoDirectLink-g293917-d8826313-i399119409-Ang_Kaew_Reservoir-Chiang_Mai.html',
    description: 'This small reservoir features pleasant walking and jogging trails, along with benches and open grassy lawns ideal for relaxing or picnicking',
    country: 'Thailand',
    rating: 4.7,
    distance: "~3.4km"
  },
 {
    id: '3',
    name: 'Chiang Mai PAO Park',
    lat: 18.7979,
    long: 98.9876,
    image: 'https://www.nationthailand.com/life/travel/40043119',
    description: 'It is the new public park of Chiang Mai Province that has quickly become popular as a beautiful place for relaxation and exercise. The park features a shady and natural atmosphere, along with stunning mountain views',
    country: 'Thailand',
    rating: 4.7,
    distance: "~6.3km"
  },

  {
    id: '4',
    name: 'Mae Kha Canal',
    lat: 18.7881,
    long: 98.9936,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fweb.codi.or.th%2F20231206-49781%2F&psig=AOvVaw04DojMeFDwTJTHxJC9FPEa&ust=1751139575523000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCZjbatko4DFQAAAAAdAAAAABAf',
    description: 'Mae Kha Canal is an ancient canal that holds significant historical importance and plays a vital role in the way of life of Chiang Mai city. Originally, it served as both the outer moat of the city and a drainage system',
    country: 'Thailand',
    rating: 4.2,
    distance: "~5.8km"
  },
  {
    id: '5',
    name: 'Ginger Farm',
    lat: 18.6672,
    long: 98.9645,
    image: 'https://th.tripadvisor.com/LocationPhotoDirectLink-g2237298-d14920344-i341550327-Ginger_Farm-Saraphi.html',
    description: 'A full-service organic farm located in Chiang Mai Province offering a variety of activities for children and families, such as vegetable planting, egg collecting, rice planting, harvesting, threshing, cooking, making traditional Thai desserts, clay molding, and kids yoga',
    country: 'Thailand',
    rating: 4.5,
    distance: "~13.5km"
  },
 {
    id: '6',
    name: 'Hor Kham Luang',
    lat: 18.752879,
    long: 98.922341,
    image: 'https://www.123rf.com/photo_35327829_hor-kham-luang-palace-in-chiang-mai-thailand.html',
    description: 'An elegant Lanna-style architecture, the building is a two-story half-wood, half-brick structure painted in reddish-brown. It stands proudly on a hill, covering an area of approximately 3,000 square meters amidst more than 470 rai of land at the Chiang Mai Royal Agricultural Research Center',
    country: 'Thailand',
    rating: 4.7,
    distance: "~10.7km"
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
    distance: "~750m"
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
    distance: "~1km"
  },
  {
    id: '10',
    name: 'สุกี้ช้างเผือก',
    lat: 18.79580688165689,
    long: 98.9853312120712,
    image: 'https://www.google.com/maps/place/สุกี้ช้างเผือก/@18.7958171,98.985389,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipM04-YHdXFK3DTQ2bbUI8kfDPByCrQIaafuHv8t!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipM04-YHdXFK3DTQ2bbUI8kfDPByCrQIaafuHv8t%3Dw86-h114-k-no!7i1108!8i1477!4m7!3m6!1s0x30da3a96d55b9a2d:0x49afbaf74a0fa72c!8m2!3d18.795817!4d98.9853308!10e5!16s%2Fg%2F11bv6pnyb4?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D',
    description: 'ร้านสุกี้ช้างเผือกสาขาตลาดโต้รุ่งเป็นหนึ่งในร้านสตรีทฟู้ดเจ้าดังที่อยู่คู่ขวัญชาวเชียงใหม่มานาน ความพิเศษของสุกี้ร้านนี้คือ สุกี้แห้งที่หอมกลิ่นกระทะ รวมถึงปริมาณเครื่องที่ให้มาแบบจัดเต็มในราคาที่จับต้องได้ จึงนับว่าเป็นหนึ่งในของเด็ดของดีที่ต้องได้มาลองสักครั้งของเชียงใหม่',
    country: 'Thailand',
    rating: 4.5,
    distance: "~2.2km"
  },
  {
    id: '11',
    name: 'Khao-Sō-i ข้าวโซอิ',
    lat: 18.80914056385872,
    long: 99.00475884526325,
    image: 'https://www.google.com/maps/place/ข้าวโซอิ/@18.8091367,99.0046182,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICX-5r3rgE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAC9h4nqjMr4oKU3q4UqdSXgeRql5TTu4dxkYzX8MJYygHHFXInthsV02CRUUBDWlnXWlHdF79uJzhAsj0YphaQc09i8X4PA55IITIkIe-VzJOw4UuuGhABOLHt8IwJV6xEBRKQf5yWxh%3Dw152-h86-k-no!7i4000!8i2252!4m7!3m6!1s0x30da3b587849f6d7:0x2858cea75f152cc6!8m2!3d18.8091471!4d99.0047617!10e5!16s%2Fg%2F11r3lyl3c_?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D',
    description: 'ร้าน Khao-Sō-i ข้าวโซอิ แม้จะพึ่งตั้งได้ไม่นานแต่ด้วยความร่อยหนึบนุ่มของเส้นข้าวซอยสดที่โชว์กระบวนวิธีการทำให้ดูต่อหน้า น้ำซุปเข้มข้นตามต้นตำรับ และการตกแต่งร้านสไตล์ญี่ปุ่น เรียกได้ว่าแทบจะพลิกโฉมการทานข้าวซอยแบบปกติของเราไปเลยทีเดียว',
    country: 'Thailand',
    rating: 4.8,
    distance: "~6.8km"
  },
  {
    id: '12',
    name: 'Mae Sai Khao Soi Restaurant',
    lat: 18.7997, 
    long: 98.9751,
    image: 'https://lh3.googleusercontent.com/geougc-cs/AB3l90DbLSXmTAU68-ih_dEWe8HmzDWe90QMkBjD_SquV7lic9ZZphEcxw-FiVVPkNAUKqHJrkA5iq2Bcw7yv0fTnt88QtJwK6PsdU3JxU8tMRaBdyi6h2hTLWexdixaIrmMP7AWZwMK=w166-h296-p',
    description: 'The highlight is the rich, aromatic Khao Soi curry soup, well-rounded flavor, not too oily, and the noodles are just the right amount of soft.',
    country: 'Thailand',
    rating: 4.5,
    distance: "~500m"
  },
  {
    id: '13',
    name: 'Chang Kei Hong Kong-style breakfast Chiang Maid City',
    lat: 18.7903, 
    long: 98.9785,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqoKVerBWmXzH-bYXAbYgLBvWBCSn02gARlvocxfNsBVUmFxz5mv9JiA6OGD7Y3h9KB3-DHeGgpKRZux-9TCgsHXZQrooj88b6o7Za4AhQJRaiuGkd4KyY1ka5ZWtk752XNH9gPbQ=w172-h224-p-k-no',
    description: 'Historic walled city with ancient temples and culture',
    country: 'Thailand',
    rating: 4.8,
    distance: "~2km"
  },
]