"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shuffle, Download } from "lucide-react"

const avatarConfig = {
  backgrounds: [
    { id: "yellow", name: "Yellow", src: "/images/backgrounds/yellow.png" },
    { id: "green", name: "Green", src: "/images/backgrounds/green.png" },
    { id: "blue", name: "Blue", src: "/images/backgrounds/blue.png" },
    { id: "brown", name: "Brown", src: "/images/backgrounds/brown.png" },
    { id: "orange", name: "Orange", src: "/images/backgrounds/orange.png" },
    { id: "pink", name: "Pink", src: "/images/backgrounds/pink.png" },
  ],
  base: { src: "/images/base/character.png" },
  clothes: [
    { id: "hoodie-black", name: "Black Hoodie", src: "/images/clothes/hoodie-black.png" },
    { id: "hoodie-cyan", name: "Cyan Hoodie", src: "/images/clothes/hoodie-cyan.png" },
    { id: "sweater", name: "Sweater", src: "/images/clothes/sweater.png" },
    { id: "tanktop", name: "Tanktop", src: "/images/clothes/tanktop.png" },
    { id: "tshirt-blue", name: "Blue T-shirt", src: "/images/clothes/tshirt-blue.png" },
    { id: "tshirt-green", name: "Green T-shirt", src: "/images/clothes/tshirt-green.png" },
    { id: "tshirt-red", name: "Red T-shirt", src: "/images/clothes/tshirt-red.png" },
    { id: "tshirt-yellow", name: "Yellow T-shirt", src: "/images/clothes/tshirt-yellow.png" },
  ],
  chain: [
    { id: "none", name: "None", src: null },
    { id: "chain-gold", name: "Gold Chain", src: "/images/chain/chain-gold.png" },
    { id: "chain-silver", name: "Silver Chain", src: "/images/chain/chain-silver.png" },
  ],
  ears: [
    { id: "none", name: "None", src: null },
    { id: "bill", name: "Bill", src: "/images/ears/bill.png" },
    { id: "rings", name: "Rings", src: "/images/ears/rings.png" },
  ],
  eyeware: [
    { id: "none", name: "None", src: null },
    { id: "eyeware-1", name: "Eyeware 1", src: "/images/eyeware/eyeware-1.png" },
    { id: "eyeware-2", name: "Eyeware 2", src: "/images/eyeware/eyeware-2.png" },
    { id: "eyeware-3", name: "Eyeware 3", src: "/images/eyeware/eyeware-3.png" },
    { id: "eyeware-4", name: "Eyeware 4", src: "/images/eyeware/eyeware-4.png" },
  ],
  footware: [
    { id: "none", name: "None", src: null },
    { id: "shoe-blue", name: "Blue Shoe", src: "/images/footware/shoe-blue.png" },
    { id: "shoe-grey", name: "Grey Shoe", src: "/images/footware/shoe-grey.png" },
    { id: "shoe-red", name: "Red Shoe", src: "/images/footware/shoe-red.png" },
    { id: "shoe-white", name: "White Shoe", src: "/images/footware/shoe-white.png" },
  ],
  hats: [
    { id: "none", name: "None", src: null },
    { id: "bandana", name: "Bandana", src: "/images/hats/bandana.png" },
    { id: "cap-black", name: "Black Cap", src: "/images/hats/cap-black.png" },
    { id: "cap-blue", name: "Blue Cap", src: "/images/hats/cap-blue.png" },
    { id: "hat-pink", name: "Pink Hat", src: "/images/hats/hat-pink.png" },
    { id: "hat-yellow", name: "Yellow Hat", src: "/images/hats/hat-yellow.png" },
  ],
  mouths: [
    { id: "none", name: "None", src: null },
    { id: "cigerette", name: "Cigerette", src: "/images/mouths/cigerette.png" },
    { id: "tongue-1", name: "Tongue 1", src: "/images/mouths/tongue-1.png" },
    { id: "tongue-2", name: "Tongue 2", src: "/images/mouths/tongue-2.png" },
    { id: "vampire-tooth", name: "Vampire Tooth", src: "/images/mouths/vampire-tooth.png" },
    { id: "ball", name: "Ball", src: "/images/mouths/ball.png" },
  ]
}

export default function ProfileCreator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [avatar, setAvatar] = useState({
    background: avatarConfig.backgrounds[2], // blue
    clothes: avatarConfig.clothes[2], // sweater
    chain: avatarConfig.chain[0], // none
    ears: avatarConfig.ears[0], // none
    eyeware: avatarConfig.eyeware[0], // none
    footware: avatarConfig.footware[0], // none
    hats: avatarConfig.hats[0], // none
    mouths: avatarConfig.mouths[0], // none
  })

  const updateAvatar = (category: string, value: any) => {
    setAvatar((prev) => ({ ...prev, [category]: value }))
  }

  const generateRandom = () => {
    setAvatar({
      background: avatarConfig.backgrounds[Math.floor(Math.random() * avatarConfig.backgrounds.length)],
      clothes: avatarConfig.clothes[Math.floor(Math.random() * avatarConfig.clothes.length)],
      chain: avatarConfig.chain[Math.floor(Math.random() * avatarConfig.chain.length)],
      ears: avatarConfig.ears[Math.floor(Math.random() * avatarConfig.ears.length)],
      eyeware: avatarConfig.eyeware[Math.floor(Math.random() * avatarConfig.eyeware.length)],
      footware: avatarConfig.footware[Math.floor(Math.random() * avatarConfig.footware.length)],
      hats: avatarConfig.hats[Math.floor(Math.random() * avatarConfig.hats.length)],
      mouths: avatarConfig.mouths[Math.floor(Math.random() * avatarConfig.mouths.length)],
    })
  }

  const downloadAvatar = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "avatar.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const renderAvatar = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Helper function to load and draw image
    const loadAndDrawImage = (src: string | null): Promise<void> => {
      if (!src) return Promise.resolve();

      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve()
        }
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`)
          resolve() // Continue even if image fails to load
        }
        img.src = src
      })
    }

    try {
      // Layer 1: Background
      await loadAndDrawImage(avatar.background.src)

      // Layer 2: Base character
      await loadAndDrawImage(avatarConfig.base.src)

      // Layer 4: Clothes
      await loadAndDrawImage(avatar.clothes.src)

      // Layer 3: Chain
      await loadAndDrawImage(avatar.chain.src)

      // Layer 5: Ears
      await loadAndDrawImage(avatar.ears.src)

      // Layer 6: Eyeware
      await loadAndDrawImage(avatar.eyeware.src)

      // Layer 7: Footware
      await loadAndDrawImage(avatar.footware.src)

      // Layer 8: Mouths
      await loadAndDrawImage(avatar.mouths.src)

      // Layer 9: Hats
      await loadAndDrawImage(avatar.hats.src)

    } catch (error) {
      console.error("Error rendering avatar:", error)
    }
  }

  useEffect(() => {
    renderAvatar()
  }, [avatar])

  const renderAvatarFeature = (feature: keyof typeof avatarConfig, label: string) => {
    const items = avatarConfig[feature] as any;

    return (
      <div>
        <h3 className="font-semibold mb-3 text-foreground">{label}</h3>
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {items.map((item: { id: string; src?: string; name: string }) => (
            <button
              key={item.id}
              // @ts-ignore
              className={`w-12 h-12 rounded-lg border-2 transition-all overflow-hidden ${(avatar[feature] ?? {}).id === item.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              onClick={() => updateAvatar(feature, item)}
            >
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">$WIWI PFP GENERATOR</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {renderAvatarFeature("backgrounds", "BACKGROUND")}
              {renderAvatarFeature("clothes", "CLOTHES")}
              {renderAvatarFeature("chain", "CHAIN")}
              {renderAvatarFeature("ears", "EARS")}
              {renderAvatarFeature("eyeware", "EYEWARE")}
              {renderAvatarFeature("footware", "FOOTWARE")}
              {renderAvatarFeature("hats", "HATS")}
              {renderAvatarFeature("mouths", "MOUTH")}
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="rounded-lg shadow-lg border border-border"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                </div>

                <div className="flex flex-col gap-4 w-full max-w-md">
                  <Button
                    onClick={generateRandom}
                    variant="outline"
                    className="flex-1 flex items-center gap-2 bg-transparent"
                  >
                    <Shuffle className="w-4 h-4" />
                    Generate Random
                  </Button>

                  <Button onClick={downloadAvatar} className="flex-1 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
