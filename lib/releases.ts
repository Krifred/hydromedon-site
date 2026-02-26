
export type Track = {
    title: string;
    duration?: string;
    lyrics?: string; // ✅ NEW
};


export type Release = {
    slug: string;
    title: string;
    type: "Single" | "Album" | "Video";
    releaseDate: string;
    year: string;
    cover: string;
    hyperfollow: string,
    spotify: string;
    youtube: string;
    subtitle: string;
    description: string;
    themes: string[];
    tracks?: Track[];
};

const SPOTIFY_ARTIST =
    "https://open.spotify.com/artist/6uDb2bAKe11eYOQR1foFQM";

const YOUTUBE_CHANNEL =
    "https://www.youtube.com/@Hydromedon";

export const releases: Release[] = [
    {
        slug: "armor-of-light-video",
        title: "Armor of Light",
        type: "Video",
        releaseDate: "2025-12-13",
        year: "2025",
        cover: "/covers/armor-of-light.jpg",
        hyperfollow: "",
        spotify: "",
        youtube: "https://youtu.be/nlaqCtY2a-c?si=nvx5Kadt32XLhb68",
        subtitle: "Official single video.",
        description: "A call to stand strong in faith and light.",
        themes: ["Video", "Cinematic"],
    },
    {
        slug: "beauty-for-ashes-video",
        title: "Beauty for Ashes",
        type: "Video",
        releaseDate: "2025-12-20",
        year: "2025",
        cover: "/covers/beauty-for-ashes.jpg",
        hyperfollow: "",
        spotify: "",
        youtube: "https://youtu.be/Z2YWw1KxZ8c?si=msAot6_DZFBD0wq0",
        subtitle: "Official single video.",
        description: "Transformation and hope from brokenness.",
        themes: ["Video", "Cinematic"],
    },
    {
        slug: "arise-o-lord-video",
        title: "Arise, O Lord",
        type: "Video",
        releaseDate: "2025-11-29",
        year: "2025",
        cover: "/covers/arise-o-lord.jpg",
        hyperfollow: "",
        spotify: "",
        youtube: "https://youtu.be/YuNm0FGE8AU?si=CxABMaHO5rdVD2LT",
        subtitle: "Official single video.",
        description: "A call to action and worship.",
        themes: ["Video", "Cinematic"],
    },
    {
        slug: "armor-of-light",
        title: "Armor of Light",
        type: "Single",
        releaseDate: "2025-12-13",
        year: "2025",
        cover: "/covers/armor-of-light.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/03diABBKdeFLKtcF5EDOtb?si=a18a0d42d7204311",
        youtube: "https://www.youtube.com/watch?v=8I5IUga1R0w&pp=0gcJCaIKAYcqIYzv",
        subtitle: "A call to stand strong in faith and light.",
        description: "Armor of Light is a powerful anthem about spiritual resilience and the strength found in faith.",
        themes: ["Faith", "Resilience", "Spiritual Warfare"],
        tracks: [{
            title: "Armor of Light",
            duration: "9:00",
            lyrics: ` 
In Your name, Jesus, I rise again
Clothed in Your armor, I take my stand
Helmet of salvation, shining bright
Breastplate of righteousness, my guiding light
Girded with truth, I walk Your way
Sandals of peace through night and day
Shield of faith, I lift it high
To quench the fire from the enemy's sky

You surround me, Lord, with fire and grace
Angels encamp in every place
Your glory guards me from behind
In Jesus' name, I'm battle-lined
Weapons not of flesh, but mighty still
I stand in faith, I do Your will
Deliverance flows, Your love sets free
Jesus, You fight the war for me

Sword of the Spirit, sharp and true
Piercing the dark, revealing You
A hedge around my heart and home
No evil shall through it roam
You give Your angels charge each hour
To lift me up with holy power
No stone shall bruise, no fear shall bind
Your promises are sealed and signed

You surround me, Lord, with fire and grace
Angels encamp in every place
Your glory guards me from behind
In Jesus' name, I'm battle-lined
Weapons not of flesh, but mighty still
I stand in faith, I do Your will
Deliverance flows, Your love sets free
Jesus, You fight the war for me

I bind the darkness, every name
Seven generations, broken chains
Confusion, fear, and unbelief
Are cast away, I find relief
I loose Your joy, Your healing rain
Restoration from the years of pain
Mercy and grace, favor divine
In Jesus' name, the victory's mine

You surround me, Lord, with fire and grace
Angels encamp in every place
Your glory guards me from behind
In Jesus' name, I'm battle-lined
Weapons not of flesh, but mighty still
I stand in faith, I do Your will
Deliverance flows, Your love sets free
Jesus, You fight the war for me

You surround me, Lord, with fire and grace
Angels encamp in every place
Your glory guards me from behind
In Jesus' name, I'm battle-lined
Weapons not of flesh, but mighty still
I stand in faith, I do Your will
Deliverance flows, Your love sets free
Jesus, You fight the war for me

Amen and amen, I rise and sing
Covered in armor of the King
Amen and amen, I rise and sing
Covered in armor of the King
`
        }
        ]
    },

    {
        slug: "beauty-for-ashes",
        title: "Beauty for Ashes",
        type: "Single",
        releaseDate: "2025-12-20",
        year: "2025",
        cover: "/covers/beauty-for-ashes.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/4BBQAGUamWLmnqZ69ha3ru?si=c99d069404e14b5e",
        youtube: "https://youtu.be/Z2YWw1KxZ8c?si=Csqt3TIpga4hlC5E",
        subtitle: "Transformation and hope from brokenness.",
        description:
            "Beauty for Ashes explores renewal and hope, drawing from the biblical promise of transformation.",
        themes: ["Renewal", "Hope", "Transformation"],
        tracks: [{
            title: "Beauty for Ashes",
            duration: "6:48",
            lyrics: `
The Spirit of the Lord is upon me
He has anointed me to speak the light
To bind the broken hearts in mercy
And set the captives free from night

To comfort those who mourn in silence
To lift the weary from despair
To trade their ashes for His beauty
And crown them with His love and care

He gives beauty for ashes
Joy for every tear
Garments of praise for sorrow
Peace that draws us near
He heals the soul's affliction
Breaks every heavy chain
His love restores the fallen
And lifts us up again

He rebuilds the ruins long forgotten
Restores the years the locusts stole
He calls us priests within His kingdom
And pours His glory on our soul

Instead of shame, He gives us honor
Instead of grief, a double share
His righteousness will shine forever
A planting of His grace and care

In silence, He is working still
In mourning, He speaks peace
He turns our pain to purpose
And makes the striving cease
From ashes rises beauty
From sorrow springs new song
The Spirit of the Lord is moving
His healing makes us strong

He clothes us in salvation's splendor
And robes us in His justice bright
As gardens bloom beneath the sunlight
We'll bloom beneath His holy light

The nations see His love through us
His glory shining in our ways
We'll sing the goodness of our Savior
And walk in freedom all our days

You've turned my mourning into dancing
My silence into praise unending
Your Spirit breathes and I arise
A light to shine, a voice to cry
Clothed in grace, I'll not look back
Your love has set me on this track
Forever Yours, I'll lift Your name
And walk in freedom, unashamed
`
        }]
    },

    {
        slug: "change-me-mold-me-make-me-new",
        title: "Change Me, Mold Me",
        type: "Single",
        releaseDate: "2026-01-23",
        year: "2026",
        cover: "/covers/change-me-mold-me.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/03eVArWvzKT0agDm8pGhUN?si=f5bdcc15c2eb431c",
        youtube: "https://youtu.be/XKnJ7wzboS8?si=mFGeQqwHpU-VTlzq",
        subtitle: "A prayer for personal transformation.",
        description:
            "This song is a heartfelt prayer for change and spiritual growth.",
        themes: ["Transformation", "Prayer", "Renewal"],
        tracks: [{
            title: "Change Me, Mold Me",
            duration: "5:53",
            lyrics: `
Lord, I come before You now
With a heart that's full of shame
For the person I once was
I ask forgiveness in Your name

Change me, mold me, make me new
Into someone who pleases You
Surround me with Your angels' light
Guide me through the darkest night

Help me leave my past behind
And focus on Your holy face
Fill me with Your love and grace
As I seek Your warm embrace

Change me, mold me, make me new
Into someone who pleases You
Surround me with Your angels' light
Guide me through the darkest night

Mold me as a tool, oh Lord
In the shape of Your own hand
Use me for Your perfect plan
Help me follow Your command

Grant me wisdom from above
To discern Your holy ways
Guide my steps with Your great love
Teach me how to live each day

Thank You for Your blessings, Lord
For the grace You freely give
For the love that fills my heart
And the strength to truly live

Lift me when my spirit's weak
When doubt and fear cloud my mind
Let Your truth be all I seek
And bring me peace that's truly kind

Lead my heart to follow You
With steadfast faith to light my way
Let Your love shine through my life
In every step, in every song

Shield me with Your mighty hand
From the trials that come my way
Keep me safe within Your plan
Guard my heart both night and day

Lord, provide the strength I need
To walk the path that You have planned
Help me forget myself, indeed
And hold me in Your loving hand

Change me, mold me, make me new
Into someone who pleases You
Surround me with Your angels' light
Guide me through the darkest night

Make me more like Jesus, Lord
In every thought, in every word
Let Your will be done in me
For Your glory, eternally`

        }]
    },

    {
        slug: "make-a-way",
        title: "Make a Way",
        type: "Single",
        releaseDate: "2026-02-06",
        year: "2026",
        cover: "/covers/make-a-way.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/3QgZ9UuLlCopfAGoQxWXue?si=aebec43e683a4882",
        youtube: "https://youtu.be/CfkbtDyYr3w?si=aoKidb94Mw-no9RO",
        subtitle: "Trusting God to open doors.",
        description:
            "Make a Way is about trusting in God's provision.",
        themes: ["Trust", "Provision", "Faith"],
        tracks: [{
            title: "Make a Way",
            duration: "4:38",
            lyrics: `
Lord, lift me from the pit
Set my feet on solid ground
You are the God who lifts
Where grace and love abound

Give me courage, Lord, I pray
To face the things I've kept at bay
Courage to stand when faith feels thin
When storms rage loud and press within

Make a way where none appears
Grant me grace through pain and tears
Grace to love when hearts feel scarred
Grace to wait when hope is barred

When I'm breaking apart
You hold me together tight
At my limit, Your power starts
Shining through the darkest night

Deliver me, Lord, I cry
From burdens heavy, stacked sky-high
Come find my heart, worn and torn
Be my strength when I'm forlorn

Make a way where none appears
Grant me grace through pain and tears
Grace to love when hearts feel scarred
Grace to wait when hope is barred

Grace to say yes to Your will
Even when it's tough to see
Strength to silence the enemy's lies
Rooted in You, let me be

And Lord, for times I can't pray
When pain is too deep to speak
When words fail and silence stays
Thank You, Your Spirit intercedes for the weak

Make a way where none appears
Grant me grace through pain and tears
Grace to love when hearts feel scarred
Grace to wait when hope is barred

Hope shines through the darkest night
A beacon when all seems lost
In Your promises, I find my light
And in Your love, I count no cost

Make a way where none appears
Grant me grace through pain and tears
Grace to love when hearts feel scarred
Grace to wait when hope is barred

Hope that rises with the dawn
A new day, a fresh start
To promises foreseen, I carry on
With faith steadfast in my heart

Make a way where none appears
Grant me grace through pain and tears
Grace to love when hearts feel scarred
Grace to wait when hope is barred

Faith that sees beyond the veil
Faith that climbs the steepest trail
Faith that walks through shadows wide
Hope that glows where fears reside `
        }]
    },

    {
        slug: "the-lord-bless-you-and-keep-you",
        title: "The Lord Bless You",
        type: "Single",
        releaseDate: "2026-02-20",
        year: "2026",
        cover: "/covers/the-lord-bless-you.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/0dhI4VUj0sj9Dvm4KEjUo5?si=3ca59b45e0364873",
        youtube: "https://youtu.be/3bCGi9FL9bE?si=pKofP0LWV49EY6MJ",
        subtitle: "A musical benediction.",
        description:
            "A musical rendering of the biblical blessing.",
        themes: ["Blessing", "Comfort", "Assurance"],
        tracks: [{
            title: "The Lord Bless You",
            duration: "4:44",
            lyrics: `
 The Lord bless me and keep me near
Protect my heart, dissolve my fear
His face shines bright with boundless grace
His love surrounds me in every place

The Lord bless you and keep you
The Lord makes His face shine on you
And be gracious to you
The Lord turn His face toward you and give you peace

You turn Your gaze, so calm, so sweet
And lay Your peace beneath my feet
Your face is radiant, grace outpoured
Your peace a gift I can't afford

The Lord bless you and keep you
The Lord makes His face shine on you
And be gracious to you
The Lord turn His face toward you and give you peace

The galaxies obey Your voice
And still, in You, my soul rejoiced
You shine on me, pure majesty
With love that stretches endlessly

The Lord bless you and keep you
The Lord makes His face shine on you
And be gracious to you
The Lord turn His face toward you and give you peace

No bargains made, no anxious prayer
Just faith in what You've placed there
Not earned by works, nor deeds I've done
But by the nature of the Son

The Lord bless you and keep you
The Lord makes His face shine on you
And be gracious to you
The Lord turn His face toward you and give you peace

You guard from shadows I can't see
From dangers known and mystery
You're watching still, You never sleep
The shepherd who defends His sheep

Thank You, Lord
Thank You, Lord
Thank You, Thank You
Thank You, Lord           `
        }]
    },

    {
        slug: "under-your-wings",
        title: "Under Your Wings",
        type: "Single",
        releaseDate: "2026-03-06",
        year: "2026",
        cover: "/covers/under-your-wings.jpg",
        hyperfollow: "",
        spotify: SPOTIFY_ARTIST,
        youtube: YOUTUBE_CHANNEL,
        subtitle: "Finding refuge and safety.",
        description:
            "Under Your Wings speaks of finding refuge and safety in God's care.",
        themes: ["Refuge", "Safety", "Protection"],
        tracks: [{
            title: "Under Your Wings",
            duration: "5:22",
            lyrics: `
He who dwells in God's secret place
Shall find refuge in His loving grace
In His care, my soul finds rest
In His embrace, I am truly blessed

God wants to protect me, this I know
In His peace, I will grow and glow
He surrounds me with His care each day
In His refuge, I will always stay

I will say of the Lord, He is my King
He is my refuge, my everything
My God in whom I trust, my shield
In His truth, my heart is healed

God wants to protect me, this I know
In His peace, I will grow and glow
He surrounds me with His care each day
In His refuge, I will always stay

Fear may knock, but I won't fall or sway
God's presence gives me courage each day
He sends His angels to guard my way
In His love, I am strong and stay

Help me start today in trust and grace
Not in fear, but in Your holy place
Let me walk in Your strength, divine
Covered by Your love, I shine

God wants to protect me, this I know
In His peace, I will grow and glow
He surrounds me with His care each day
In His refuge, I will always stay

Thank You, Lord, for this sacred space
You are my refuge, my embrace
In You, I place all my trust and might
Through valleys deep, You are my light `
        }]
    },

    {
        slug: "your-peace-surpasses-all-understanding",
        title: "Your Peace",
        type: "Single",
        releaseDate: "2026-03-20",
        year: "2026",
        cover: "/covers/your-peace-surpasses-all-understanding.jpg",
        hyperfollow: "",
        spotify: SPOTIFY_ARTIST,
        youtube: YOUTUBE_CHANNEL,
        subtitle: "Experiencing divine peace.",
        description:
            "This song is about peace that transcends understanding.",
        themes: ["Peace", "Calm", "Divine Presence"],
        tracks: [{
            title: "Your Peace Surpasses All Understanding",
            duration: "6:02",
            lyrics: `
When my heart is heavy, and my mind is full of fear
I turn to You, Lord, knowing You are near
In every situation, with thanksgiving, I will pray
Casting all my worries, trusting You each day

Oh, Your peace, it surpasses all understanding
Guarding my heart and mind in Christ Jesus
Help me fill my thoughts with what is right
Pure, lovely, admirable in Your sight

When doubts arise and troubles seem to grow
I remember Your words, Lord, and let my faith show
Whatever is excellent, praiseworthy, and true
I will dwell on these things, drawing closer to You

Oh, Your peace, it surpasses all understanding
Guarding my heart and mind in Christ Jesus
Help me fill my thoughts with what is right
Pure, lovely, admirable in Your sight

In my struggles, when I feel so weak
I seek Your strength, Lord, it's Your face I seek
Through every trial and storm, You are my guide
In Your loving arms, I find a place to hide

Oh, Your peace, it surpasses all understanding
Guarding my heart and mind in Christ Jesus
Help me fill my thoughts with what is right
Pure, lovely, admirable in Your sight

In the quiet moments, when I seek Your face
Your presence fills me with unending grace
I will rejoice always, in Your love so divine
Knowing You are with me, Your peace is mine

Oh, Your peace, it surpasses all understanding
Guarding my heart and mind in Christ Jesus
Help me fill my thoughts with what is right
Pure, lovely, admirable in Your sight

Thank You, Lord, for Your peace and Your love
For guiding me always, from heaven above
In my prayers, I find strength and delight
In Your presence, Lord, I find my light
`
        }]
    },

    {
        slug: "arise-o-lord",
        title: "Arise O Lord",
        type: "Single",
        releaseDate: "2025-11-29",
        year: "2025",
        cover: "/covers/arise-o-lord.jpg",
        hyperfollow: "",
        spotify: "https://open.spotify.com/track/3ut8WjurvXkLDsT24joSSO?si=2f2ee1ee52324cc8",
        youtube: "https://youtu.be/YuNm0FGE8AU?si=f6d9sBVu01B3V80_",
        subtitle: "A call to action and worship.",
        description:
            "Arise O Lord is a song of praise and invocation.",
        themes: ["Praise", "Action", "Worship"],
        tracks: [{
            title: "Arise O Lord",
            duration: "5:47",
            lyrics: `
Almighty God, my shelter and shield
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
And I will trust the fight to You `
        }]
    },
    {
        slug: "biblical-graffiti",
        title: "Biblical Graffiti",
        type: "Album",
        releaseDate: "2026-03-20",
        year: "2026",
        cover: "/covers/biblical-graffiti.jpg",
        hyperfollow: "https://distrokid.com/hyperfollow/hydromedon/biblical-graffiti",
        spotify: SPOTIFY_ARTIST,
        youtube: YOUTUBE_CHANNEL,
        subtitle: "A cinematic journey through faith.",
        description:
            "Biblical Graffiti is a concept album weaving together themes of faith, transformation, and spiritual journey.",
        themes: ["Faith", "Transformation", "Journey"],
        tracks: [
            { title: "Armor of Light", duration: "9:00" },
            { title: "Beauty for Ashes", duration: "6:48" },
            { title: "Change Me, Mold Me, Make Me New", duration: "5:53" },
            { title: "Make a Way", duration: "4:38" },
            { title: "The Lord Bless You and Keep You", duration: "4:43" },
            { title: "Under Your Wings", duration: "5:22" },
            { title: "Your Peace Surpasses All Understanding", duration: "6:02" },
            { title: "Arise O Lord", duration: "5:47" }
        ]
    }
];

export function getReleaseBySlug(slug: string): Release | undefined {
    return releases.find((r) => r.slug === slug);
}

export function singleReleases(): Release[] {
    return releases.filter((r) => r.type === "Single");
}

export function albumReleases(): Release[] {
    return releases.filter((r) => r.type === "Album");
}

export function videoReleases(): Release[] {
    return releases.filter((r) => r.type === "Video");
}

// Legacy compatibility, prefer singleReleases() going forward
export function songReleases(): Release[] {
    return singleReleases();
}
``