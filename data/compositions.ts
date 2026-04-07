export const compositions = [
  {
    slug: "arise-o-lord",
    title: "Arise, O Lord",
    subtitle: "Lead Sheet",
    description:
      "Born from the psalms of deliverance and the quiet ache of waiting, Arise, O Lord is a cry for God's intervention, strength, and justice.",
    about:
      "This piece carries the tension between vulnerability and boldness — a prayer that rises from the depths and refuses to fall silent.",
    lyrics: `Almighty God, my shelter and shield
My defender, my strength in the field
I come not quiet, but bold in my cry
There are battles I can't win, though I try

You are the God who rescues and saves
You step in when the storm misbehaves
So I lift my voice and call on Your name
Jesus, fight for me again

Arise, O Lord, scatter my foes
Silence the lies only heaven knows
You are my justice, my refuge, my peace
You speak for me when my words cease
Arise, O Lord, surround me like flame
Let every trial glorify Your name

You dress a table where enemies see
That You, O Lord, have fought for me
You heal the wounds no one can trace
You pour Your oil on every place

Arise and let no false word stand
No witness rise by human hand
You are my shield, my holy flame
You guard my soul, You know my name

Hope is rising in the waiting
Faith is growing in the fire
You are working in the silence
Turning ashes into choir
Every tear sown in sorrow
Will bloom in joy tomorrow
You are faithful, You are near
My Redeemer, I won't fear

Arise, O Lord, scatter my foes
Silence the lies only heaven knows
You are my justice, my refuge, my peace
You speak for me when my words cease
Arise, O Lord, surround me like flame
Let every trial glorify Your name

Let my story stir dry bones awake
Let my breakthrough show the path You make
You still redeem, You still renew
And I will trust the fight to You`,
    sampleImage: "/samples/arise-o-lord.jpg",
    samplePdf: "/samples/arise-o-lord.pdf",
    spotify: "https://open.spotify.com/track/3ut8WjurvXkLDsT24joSSO",
    youtube: "https://youtu.be/YuNm0FGE8AU",
    technical: {
      key: "C♯ major",
      tempo: "121 BPM",
      timeSignature: "4/4",
      difficulty: "Intermediate",
      length: "6 pages",
      instrumentation: "Voice, Chord Symbols, Lead Sheet Format",
    },
    scores: [
      {
        type: "Lead Sheet",
        status: "available",
        url: "/sheet-music/arise-o-lord/resources",
        purchaseUrl: "https://store.hydromedon.com/products/arise-o-lord-lead-sheet",
        details: {
          length: "6 pages",
          instrumentation: "Voice, Chord Symbols, Lead Sheet Format",
        },
      },
      {
        type: "Full Score + Instrument Parts",
        status: "coming-soon",
        details: {
          length: "TBD",
          instrumentation: "Piano, Strings, Auxiliary Instruments",
        },
      },
    ],
  },
];

export type Composition = (typeof compositions)[number];
export type Score = Composition["scores"][number];
