import membercatLogo from "../../..//public/logo.png";

export default function Logo(props) {
    return (
        <img
            {...props}
            viewBox="0 0 316 316"
            src={membercatLogo}
            alt="Membercat Studios Logo"
        />
    );
}
