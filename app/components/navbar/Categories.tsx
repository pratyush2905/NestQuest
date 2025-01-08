'use client'
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiArabicDoor, GiBoatFishing, GiCactus, GiCactusPot, GiCastle, GiCaveEntrance, GiDesert, GiDesertEagle, GiFarmer, GiFarmTractor, GiFire, GiForestCamp, GiIsland, GiSnowflake1, GiSnowman, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";

export const categories = [{
    label:'Beach',
    icon: TbBeach,
    description:'Property is close to a beach'
    },
    {
        label:'Windmill',
        icon:GiWindmill,
        description:'Property has a windmill'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'Property is a modern villa '
    },
    {
        label:'Countryside',
        icon:GiFarmTractor,
        description:'Property is in a countryside '
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'Property consists of a pool'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'The property is on an island'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'A fishing lake is nearby '
    },
    {
        label:'Ski-ing',
        icon:FaSkiing,
        description:'Ski-ing activity can be done neabry'
    },
    {
        label:'Castles',
        icon:GiCastle,
        description:'Property is in a castle'
    },
    {
        label:'Camping',
        icon:GiForestCamp,
        description:'Camping facilities are available'
    },
    {
        label:'HillStation',
        icon:GiSnowman,
        description:'Property is situated on a snowy hilly region'
    },
    {
        label:'Caves',
        icon:GiCaveEntrance,
        description:'Caves are nearby the property'
    },
    {
        label:'Desert',
        icon:GiCactus,
        description:'Property is in a desert area'
    },
    {
        label:'Lux',
        icon:IoDiamondSharp,
        description:'Luxury Villa Property'
    },
]


const Categories = () => {
    const params = useSearchParams();

    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname==='/';
    
    if(!isMainPage){
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item)=>(
                    <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                    />
                ))}
            </div>
        </Container>        
    );
}

export default Categories;