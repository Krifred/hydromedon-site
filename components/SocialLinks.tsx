import YoutubeIcon from "./icons/YoutubeIcon";
import SpotifyIcon from "./icons/SpotifyIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";

export default function SocialLinks() {
    return (
        <div className="flex gap-2 justify-center mb-0 mt-4">
            <a href="https://youtube.com/@hydromedon" target="_blank"><YoutubeIcon /></a>
            <a href="https://open.spotify.com/artist/6uDb2bAKe11eYOQR1foFQM" target="_blank"><SpotifyIcon /></a>
            <a href="https://tiktok.com/@hydromedon" target="_blank"><TikTokIcon /></a>
            <a href="https://x.com/hydromedon" target="_blank"><XIcon /></a>
            <a href="https://www.facebook.com/Hydromedon/" target="_blank"><FacebookIcon /></a>
            <a href="https://instagram.com/hydromedon" target="_blank"><InstagramIcon /></a>
        </div>
    );
}
