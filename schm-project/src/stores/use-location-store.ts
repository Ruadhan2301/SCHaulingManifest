import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LocationType } from '@/enums/locationType'
import type { Location } from '@/models/location'
import { Planets } from '@/enums/planets'

export const useLocationStore = defineStore('locations', () => {
  const locations = ref<Location[]>([
    //Pyro
      //Pyro 1
        {display_name: 'Rustville',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro1,map_x: 0,map_y: 0,},
      //Pyro 2
        {display_name: 'Arid Reach',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro2,map_x: 0,map_y: 0,},
        {display_name: "Jackson's Swap",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro2,map_x: 0,map_y: 0,},
        {display_name: 'Sunset Mesa',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro2,map_x: 0,map_y: 0,},
      //Pyro 3
        {display_name: 'Bueno Ravine',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro3,map_x: 0,map_y: 0,},
        {display_name: 'Frigid Knot',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro3,map_x: 0,map_y: 0,},
        {display_name: 'Orbituary',type: LocationType.Station,parentBody: Planets.Pyro_Pyro3,map_x: 0,map_y: 0,},
        {display_name: 'The Golden Riviera',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro3,map_x: 0,map_y: 0,},
      
      //Pyro 5
        {display_name: 'Blackrock Exchange',type: LocationType.Outpost,parentBody: Planets.Pyro_Terminus,map_x: 0,map_y: 0,},
        {display_name: 'Canard View',type: LocationType.Outpost,parentBody: Planets.Pyro_Terminus,map_x: 0,map_y: 0,},
        {display_name: 'Last Landings',type: LocationType.Outpost,parentBody: Planets.Pyro_Terminus,map_x: 0,map_y: 0,},
        {display_name: 'Rough Landing',type: LocationType.Outpost,parentBody: Planets.Pyro_Terminus,map_x: 0,map_y: 0,},
        {display_name: 'Ruin Station',type: LocationType.Station,parentBody: Planets.Pyro_Terminus,map_x: 0,map_y: 0,},
        //Pyro 5 - Ignis        
        {display_name: 'Ashland',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Ignis,map_x: 0,map_y: 0,},
        {display_name: "Kabir's Outpost",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Ignis,map_x: 0,map_y: 0,},
        //Pyro 5 - Pyro IV
        {display_name: "Chawla's Beach",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Pyro4,map_x: 0,map_y: 0,},
        {display_name: 'Fallow Field',type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Pyro4,map_x: 0,map_y: 0,},
        {display_name: "Goner's Deal",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Pyro4,map_x: 0,map_y: 0,},
        {display_name: "Sacren's Plot",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Pyro4,map_x: 0,map_y: 0,},
        //Pyro 5 - Vatra
        {display_name: "Seer's Canyon",type: LocationType.Outpost,parentBody: Planets.Pyro_Pyro5_Vatra,map_x: 0,map_y: 0,},
      //Lagrange Stations
        {display_name: 'Dudley & Daughters',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Megumi Refueling',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: "Rat's Nest",type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: "Rod's Fuel 'N Supplies",type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Starlight Service Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Patch City',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Gaslight',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Checkmate',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        {display_name: 'Endgame',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
        
  //Stanton
  //Hurston  
  {display_name: 'HDMS-Edmond',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Hadley',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Oparei',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Pinewood',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Stanhope',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Thedus',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Rappel',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Reclamation & Disposal Orinth',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},  
  {display_name: 'Cutter’s Rig',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Finn’s Folly',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Covalex Distribution Centre S1DC06',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Dupree Industrial Manufacturing Facility',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Greycat Stanton I Production Complex-B',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Sakura Sun Magnolia Workcenter',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDPC-Casillo',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'HDPC-Farnesway',type: LocationType.DistributionCenter,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Teasa Spaceport (Lorville)',type: LocationType.City,parentBody: Planets.Stanton_Hurston ,map_x: 0,map_y: 0,},
  {display_name: 'Ludlow',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: "Maker's Point",type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Pickers Field',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Weeping Cove',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Zephyr',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  {display_name: 'Everus Harbor',type: LocationType.Station,parentBody: Planets.Stanton_Hurston,map_x: 0,map_y: 0,},
  //Hurston - Aberdeen
  {display_name: 'HDMS-Anderson',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Aberdeen,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Norgaard',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Aberdeen,map_x: 0,map_y: 0,},
  //Hurston - Arial
  {display_name: 'HDMS-Bezdek',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Arial,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Lathan',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Arial,map_x: 0,map_y: 0,},
  //Hurston - Magda
  {display_name: 'HDMS-Hahn',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Magda,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Perlman',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Magda,map_x: 0,map_y: 0,},
  //Hurston - Ita
  {display_name: 'HDMS-Ryder',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Ita,map_x: 0,map_y: 0,},
  {display_name: 'HDMS-Woodruff',type: LocationType.Outpost,parentBody: Planets.Stanton_Hurston_Ita,map_x: 0,map_y: 0,},
  //ArcCorp
  {display_name: 'Riker Memorial Spaceport (Area18)',type: LocationType.City,parentBody: Planets.Stanton_ArcCorp,map_x: 0,map_y: 0,},
  {display_name: 'Baijini Point',type: LocationType.Station,parentBody: Planets.Stanton_ArcCorp,map_x: 0,map_y: 0,},
  //ArcCorp - Wala
  {display_name: 'ArcCorp Mining Area 045',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  {display_name: 'ArcCorp Mining Area 048',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  {display_name: 'ArcCorp Mining Area 056',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  {display_name: 'ArcCorp Mining Area 061',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  {display_name: "Samson & Son's Salvage Center",type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  {display_name: 'Shady Glen Farms',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Wala,map_x: 0,map_y: 0,},
  //ArcCorp - Lyria
  {display_name: 'Humboldt Mines',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  {display_name: 'Loveridge Mineral Reserve',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  {display_name: 'Paradise Cove',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SAL-2',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SAL-5',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  {display_name: 'The Orphanage',type: LocationType.Outpost,parentBody: Planets.Stanton_ArcCorp_Lyria,map_x: 0,map_y: 0,},
  //Crusader
  {display_name: 'August Dunlow Spaceport (Orison)',type: LocationType.City,parentBody: Planets.Stanton_Crusader,map_x: 0,map_y: 0,},
  {display_name: 'Seraphim Station',type: LocationType.Station,parentBody: Planets.Stanton_Crusader,map_x: 0,map_y: 0,},
  //Crusader - Daymar
  {display_name: 'ArcCorp Mining Area 141',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  {display_name: 'Bountiful Harvest Hydroponics',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  {display_name: "Brio's Breaker Yard",type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  {display_name: 'Kudre Ore',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  {display_name: 'Nuen Waste Management',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SCD-1',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Daymar,map_x: 0,map_y: 0,},
  //Crusader - Yela
  {display_name: 'Jumptown',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},  
  {display_name: 'ArcCorp Mining Area 157',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},
  {display_name: 'Benson Mining Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},
  {display_name: 'Deakins Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},
  {display_name: 'NT-999-XX',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},
  {display_name: 'Grim HEX',type: LocationType.Station,parentBody: Planets.Stanton_Crusader_Yela,map_x: 0,map_y: 0,},
  //Crusader - Cellin
  {display_name: 'Gallete Family Farms',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Cellin,map_x: 0,map_y: 0,},
  {display_name: 'Hickes Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Cellin,map_x: 0,map_y: 0,},
  {display_name: 'PRIVATE PROPERTY',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Cellin,map_x: 0,map_y: 0,},
  {display_name: 'Terra Mills HydroFarm',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Cellin,map_x: 0,map_y: 0,},
  {display_name: 'Tram & Myers Mining',type: LocationType.Outpost,parentBody: Planets.Stanton_Crusader_Cellin,map_x: 0,map_y: 0,},
  //MicroTech
  {display_name: 'Astor’s Clearing',type: LocationType.Outpost,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Bloodshot Ridge',type: LocationType.Outpost,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Dunboro',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Rayari Deltana Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SM0-10',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SM0-13',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SM0-18',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SM0-22',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'The Necropolis',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Covalex Distribution Centre S4DC05',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Cry-Astro Processing Plant 34-12',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Sakura Sun Goldenrod Workcenter',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Cry-Astro Processing Plant 19-02',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Microtech Logistics Depot S4LD13',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Microtech Logistics Depot S4LD01',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Greycat Stanton IV Production Complex A',type: LocationType.DistributionCenter,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'New Babbage Interstellar Spaceport',type: LocationType.City,parentBody:  Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Outpost 54',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Frostbite',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Harper’s Point',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Moreland Hills',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Razor’s Edge',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  {display_name: 'Port Tressler',type: LocationType.Station,parentBody: Planets.Stanton_MicroTech,map_x: 0,map_y: 0,},
  //MicroTech - Calliope
  {display_name: 'Rayari Anvik Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Calliope,map_x: 0,map_y: 0,},
  {display_name: 'Rayari Kaltag Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Calliope,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SMCa-6',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Calliope,map_x: 0,map_y: 0,},
  {display_name: 'Shubin Mining Facility SMCa-8',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Calliope,map_x: 0,map_y: 0,},
  {display_name: "Raven's Roost",type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Calliope,map_x: 0,map_y: 0,},
  //MicroTech - Clio
  {display_name: 'Rayari Cantwell Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Clio,map_x: 0,map_y: 0,},
  {display_name: 'Rayari McGrath Research Outpost',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Clio,map_x: 0,map_y: 0,},
  //MicroTech - Euterpe
  {display_name: "Bud's Growery",type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Euterpe,map_x: 0,map_y: 0,},
  {display_name: 'Devlin Scrap & Salvage',type: LocationType.Outpost,parentBody: Planets.Stanton_MicroTech_Euterpe,map_x: 0,map_y: 0,},
  //Lagrange Stations
  {display_name: 'ARC-L1 Wide Forest Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'ARC-L2 Lively Pathway Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'ARC-L3 Modern Express Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'ARC-L4 Faint Glen Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'ARC-L5 Yellow Core Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'CRU-L1 Ambitious Dream Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'CRU-L4 Shallow Fields Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'CRU-L5 Beautiful Glen Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'HUR-L1 Green Glade Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'HUR-L2 Faithful Dream Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'HUR-L3 Thundering Express Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'HUR-L4 Melodic Fields Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'HUR-L5 High Course Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'MIC-L1 Shallow Frontier Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'Xenothreat-SecurityStation',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'MIC-L2 Long Forest Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'MIC-L3 Endless Odyssey Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'MIC-L4 Red Crossroads Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'MIC-L5 Modern Icarus Station',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'Magnus Gateway',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'Pyro Gateway',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'Terra Gateway',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  {display_name: 'Stanton Gateway',type: LocationType.Station,parentBody: null,map_x: 0,map_y: 0,},
  ])

  const generateRoute = () => {
    // generate route
  }

  return { locations, generateRoute }
})
