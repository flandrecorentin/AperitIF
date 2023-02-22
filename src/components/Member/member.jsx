import React from 'react';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import Style from "./member.scss";
import {Box} from "@mui/material";
import {Eva, Simon, Mael, Colin, Corentin, Mohamed, Alexis} from "../../info/Info";

export default function Member(props) {
   var url = ""; var data = {};
   console.log(props);
   switch (props.name) {
       case "Simon":
           data = Simon;
           url = "https://media-exp1.licdn.com/dms/image/D4E35AQGnVE0YS8a86Q/profile-framedphoto-shrink_400_400/0/1665414309182?e=1671440400&v=beta&t=r50SIx3WfXiSuxbDB1IeNf87n5tebCNNb-S_K2b7osY";
           break;
       case "Mael":
           data = Mael;
           url = "https://media-exp1.licdn.com/dms/image/D4E35AQFLuXmr9WEXkA/profile-framedphoto-shrink_400_400/0/1642771928851?e=1671440400&v=beta&t=czf5gSmEgc5RUkDtIvrsnx7UnOcQctPq8D4bpOOwh6k";
           break;
       case "Corentin":
          data = Corentin;
          url = "https://media-exp1.licdn.com/dms/image/C4E03AQGbNDd4N2BOgw/profile-displayphoto-shrink_400_400/0/1627905476317?e=1676505600&v=beta&t=iy1ZnbyH6Pl1Na2VTPPI8hT82lYf2ltfwt-p22CMzKE";
          break;
       case "Colin":
          data = Colin;
          url = "https://media-exp1.licdn.com/dms/image/D4D35AQHnnxrxnGY6Qw/profile-framedphoto-shrink_400_400/0/1665145693439?e=1671440400&v=beta&t=w39ocB3eHn6C0Qqrq6cD3hJOxc9-TlETueidGD3ekwc";
          break;
       case "Alexis":
          data = Alexis;
          url = "https://media-exp1.licdn.com/dms/image/D4E35AQEnK7_DDwug6g/profile-framedphoto-shrink_400_400/0/1666259161901?e=1671440400&v=beta&t=EmhRCkxeZpZkQ0E5p8VPl4aCyj9p7-j_4EpR0FeCgjQ";
          break;
       case "Eva":
          data = Eva;
          url = "https://media-exp1.licdn.com/dms/image/C4E03AQG030u7UL6xcA/profile-displayphoto-shrink_400_400/0/1641199425681?e=1676505600&v=beta&t=remHwM8PAAmw5hT2GXDuWD6v7A0tDvHI4voF7_nZpNk";
          break;
       case "Mohamed":
          data = Mohamed;
          url = "https://media.licdn.com/dms/image/D4E03AQFLR9UoBRjRmw/profile-displayphoto-shrink_200_200/0/1672433570519?e=1677715200&v=beta&t=qcDlITg-_KbO8_-0xYaQIFg9mqSQeFl8Xcgysr5mMbg"
          break;
   }

   console.log(data);

   return (
      <Box component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
           justifyContent={'center'} minHeight={'calc(50vh - 87.5px)'}>
         <Box className="avatar shadowed" alt={props.name} style={{background: data.gradient}} component={'img'} src={url} width={{xs: '17.5vh', md: '20vh'}}
              height={{xs: '17.5vh', md: '20vh'}}
              borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/>
         <Box>
            <h3>Hi, I'm <span style={{background: data.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{data.firstName}</span><span className="hand">🤚</span>
            </h3>
            <h4>I'm {data.position}.</h4>
            <Box component={'ul'} p={'0.8rem'}>
               {data.miniBio.map((bio, index) => (
                  <EmojiBullet key={index} emoji={bio.emoji} text={bio.text}/>
               ))}
            </Box>
            <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} fontSize={{xs: '2rem', md: '2.5rem'}}>
               {
                  data.socials.map((social, index) => (
                  <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
               ))}
            </Box>
         </Box>
      </Box>
   )
}