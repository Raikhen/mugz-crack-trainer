"use client";

const videos = [
  'vDxkxEwobRg', // Jordan's send of Desert Gold
  'AFa1qpldmiM', // Potter's solo of Separate Reality
  'N6_OC47CgBI', // Cobra Crack
  'WeUoLWiVH8U', // Alex Honnold's free solo of The Phoenix
  'X8fJ3FBmUHQ', // Air Swedin
  '4vDk5Icezk0', // Random Motivation video
  'aUUP2ykGZEU', // Get it on
  'Me2_4hyT_FI', // Bulletproof
  'LIU13_lASbs', // Ritmo Latino
  'up2KLo0CeUc', // Tyler Karow on the Franco-Argentina
  'PNo5m4hhzsc', // Karow on Pilar Rojo
  'AL2jTvuNKsA', // Karow on Chiaro di Luna
  'lwz8Wv2hiQQ', // Desperate Reality,
  'CfOsDO7fVRY', // Torre Egger
  'bzYvS8jG8NM', // Colin Haley on de l'S
]

export default function StokeCard() {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)]

  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl lg:block hidden">
      <iframe src={`https://www.youtube.com/embed/${randomVideo}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
}