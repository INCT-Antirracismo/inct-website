'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type CardGeneratorProps = {};

const siteURL = 'incteducacaoantirracismo.org';

export default function CardGenerator(props: CardGeneratorProps) {
  const [text, setText] = useState(
    'Encerramos 2025 com ciência em movimento! 2026 vem aí com o primeiro encontro internacional do INCT Antirracismo e novos passos do INCT. Até 2026!'
  );
  const [textSize, setTextSize] = useState('md');
  const [color, setColor] = useState('brown');
  return (
    <div className="w-full flex items-center justify-center min-h-svh">
      <div className="flex gap-5 items-center">
        <div className="bg-muted rounded p-4 my-3 w-64 border">
          <p className="font-medium text-sm mb-3">Cor</p>
          <RadioGroup
            value={color}
            onValueChange={(v) => setColor(v)}
            className="mb-5"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="brown" id="brown" />
              <Label htmlFor="brown">Marrom</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="trinidad" id="trinidad" />
              <Label htmlFor="trinidad">Laranja</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="sun" id="sun" />
              <Label htmlFor="sun">Amarelo</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="white-sun" id="white-sun" />
              <Label htmlFor="white-sun">Branco / Laranja</Label>
            </div>
          </RadioGroup>
          <p className="font-medium text-sm mb-3">Tamanho do texto</p>
          <RadioGroup
            value={textSize}
            onValueChange={(v) => setTextSize(v)}
            className="mb-5"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="sm" id="sm" />
              <Label htmlFor="sm">Pequeno</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="md" id="md" />
              <Label htmlFor="md">Médio</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="lg" id="lg" />
              <Label htmlFor="lg">Grande</Label>
            </div>
          </RadioGroup>
          <p className="font-medium text-sm mb-3">Texto do card</p>
          <Textarea onChange={(e) => setText(e.target.value)} value={text} />
        </div>

        <div
          className={cn(
            'aspect-3/4 p-6 py-8 flex flex-col justify-between shadow-xl border w-96',
            color === 'brown'
              ? 'bg-brown text-white'
              : color === 'sun'
                ? 'text-black bg-sun'
                : color === 'trinidad'
                  ? 'text-white bg-trinidad'
                  : 'bg-white text-trinidad'
          )}
        >
          <p
            className={cn(
              'font-medium leading-snug whitespace-pre-line',
              textSize === 'sm'
                ? 'text-2xl'
                : textSize === 'md'
                  ? 'text-3xl'
                  : 'text-4xl'
            )}
          >
            {text}
          </p>
          <div className="border-t pt-3 flex gap-3 justify-between items-center">
            <p className="text-sm ">{siteURL}</p>
            <img src="/icon.png" alt="" className=" w-8 h-fit" />
          </div>
        </div>
      </div>
    </div>
  );
}
