import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

const social_data = [
	{
		id: 1,
		name: 'Facebook',
		link: 'https://www.facebook.com/alexvalverde666/',
		icon: <BsFacebook className='icon-social' />
	},
	{
		id: 2,
		name: 'Instagram',
		link: 'https://www.instagram.com/alexvalverde._/',
		icon: <BsInstagram className='icon-social' />
	},
	{
		id: 3,
		name: 'LinkedIn',
		link: 'https://www.linkedin.com/in/dev-alexander-valverde/',
		icon: <BsLinkedin className='icon-social' />
	},
	{
		id: 4,
		name: 'Github',
		link: 'https://github.com/AlexanderValverde/',
		icon: <BsGithub className='icon-social' />
	}
];

export default social_data;