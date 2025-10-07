{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import Jimp from 'jimp';\
\
export default async function handler(req, res) \{\
  if (req.method !== 'POST') return res.status(405).json(\{ error: 'Method not allowed' \});\
\
  try \{\
    const \{ imageUrl, number \} = req.body;\
    if (!imageUrl || number === undefined)\
      return res.status(400).json(\{ error: 'imageUrl and number required' \});\
\
    const image = await Jimp.read(imageUrl);\
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_RED);\
\
    image.print(font, 10, 10, number.toString());\
\
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);\
    const base64 = buffer.toString('base64');\
\
    res.status(200).json(\{ base64: `data:image/png;base64,$\{base64\}` \});\
  \} catch (err) \{\
    console.error(err);\
    res.status(500).json(\{ error: 'Failed to process image' \});\
  \}\
\}}