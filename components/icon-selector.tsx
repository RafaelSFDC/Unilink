"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";

// Lista de emojis/ícones populares para links
const POPULAR_ICONS = [
  "🌐",
  "📱",
  "💻",
  "📧",
  "📞",
  "📍",
  "🎵",
  "🎥",
  "📸",
  "🎨",
  "✍️",
  "📝",
  "🛒",
  "💼",
  "🎓",
  "🏠",
  "❤️",
  "⭐",
  "🔗",
  "📊",
  "📈",
  "💡",
  "🚀",
  "🎯",
  "👤",
  "👥",
  "🌟",
  "🔥",
  "💎",
  "🎪",
  "📚",
  "🎮",
  "🏆",
  "🎁",
  "🌈",
  "☀️",
  "🌙",
  "⚡",
  "🎭",
  "🎪",
  "🎨",
  "🎯",
  "📢",
  "📣",
  "📻",
  "📺",
  "🎬",
  "🎤",
];

interface IconSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export function IconSelector({
  value = "",
  onChange,
  name,
}: IconSelectorProps) {
  const [hasIcon, setHasIcon] = useState(!!value);
  const [selectedIcon, setSelectedIcon] = useState(value);
  const [customIcon, setCustomIcon] = useState(
    value && !POPULAR_ICONS.includes(value) ? value : "",
  );

  const handleIconToggle = (checked: boolean) => {
    setHasIcon(checked);
    if (!checked) {
      setSelectedIcon("");
      setCustomIcon("");
      onChange("");
    }
  };

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setCustomIcon("");
    onChange(icon);
  };

  const handleCustomIconChange = (icon: string) => {
    setCustomIcon(icon);
    setSelectedIcon("");
    onChange(icon);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 bg-muted border-2 border-foreground p-3 shadow-neo-sm w-fit">
        <Switch
          id="has-icon"
          checked={hasIcon}
          onCheckedChange={handleIconToggle}
        />
        <Label
          htmlFor="has-icon"
          className="text-xs font-black uppercase cursor-pointer"
        >
          Adicionar ícone ao link
        </Label>
      </div>

      {hasIcon && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-16 w-16 border-4 shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <span className="text-3xl">
                    {selectedIcon || customIcon || (
                      <Smile className="h-8 w-8" />
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 border-4 border-foreground bg-background shadow-neo p-4">
                <div className="space-y-4">
                  <h4 className="font-black uppercase text-xs tracking-widest border-b-2 border-foreground pb-2">
                    Escolha um ícone
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {POPULAR_ICONS.map((icon) => (
                      <Button
                        key={icon}
                        variant={selectedIcon === icon ? "default" : "outline"}
                        className="h-10 w-10 p-0 border-2 shadow-neo-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                        onClick={() => handleIconSelect(icon)}
                      >
                        <span className="text-xl">{icon}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex-1">
              <Input
                placeholder="Ou digite um emoji"
                value={customIcon}
                onChange={(e) => handleCustomIconChange(e.target.value)}
                maxLength={2}
                className="h-16 text-center text-3xl border-4 shadow-neo"
              />
            </div>
          </div>

          <p className="text-xs font-bold uppercase opacity-60">
            Escolha um ícone popular ou digite um emoji personalizado
          </p>

          {/* Hidden input para o formulário */}
          <input type="hidden" name={name} value={selectedIcon || customIcon} />
        </div>
      )}

      {!hasIcon && <input type="hidden" name={name} value="" />}
    </div>
  );
}
