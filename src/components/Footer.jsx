import React from 'react';
import '../css/Footer.css';
import social_data from '../data/social_data';
import { BsLink45Deg } from "react-icons/bs";

function Footer() {

    /*
    
    */
    return (
        <footer className='contentFooter'>
            <div className="footer">
                <div className='content-data'>
                    <span className='title-footer'>Data provided by TriviaAPI</span>
                    <div className='more-information'>
                        <span>For more information visit: </span>
                    </div>
                    <div className='logo-information'>
                        <a
                            href='https://opentdb.com/'
                            target='_blank'
                            rel='noreferrer'
                            className='linkopen'
                        >
                            <span className='icon'>
                                <BsLink45Deg className='icon_link'/>
                            </span>
                            <span className='visit'>OpenTDB.com</span>
                        </a>
                    </div>
                </div>
                <div className='social'>
                    <div className='data-social'>
                        <span className='namemade'>Made by Alexander Valverde </span>
                        <div>
                            <span className='name'>AlexVDev</span>
                        </div>
                        
                    </div>
                    <ul className='link-social'>
                        {social_data.map(link => (
                            <li key={link.id} className='icon_li'>
                                <a href={link.link} target='_blank' rel='noreferrer'>
                                    {link.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </footer>
    )
}

export default Footer;