namespace LouenArmoury {
    
    const x = BretonniaInGameKitbash

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "wh_main_brt_louen_leoncouer",
        (agentKey, characther) => {
            console.warn("Changing louen appearance!")
            characther.ChangeModelAppearance("wh_main_art_set_brt_louen_leoncoeur_armoury_override")
        }
    )



    OnCampaignStart( () => {
        core.add_listener(
            "add additional louen item when receiving -> The Armour of Briliance",
            "CharacterAncillaryGained",
            (context) => {
                if(!context.character) return false
                if(!context.ancillary) return false
                
                const character   = x.WrapICharacterObjectToCharacter(context.character())
                const isKitbashed = x.KitbashedCharacter.TryCast(character) != null
                const isLouen     = character.SubtypeKey == "wh_main_brt_louen_leoncouer"
                const isAncillaryTarget = context.ancillary() == "wh2_dlc12_anc_armour_brt_armour_of_brilliance"
    
                return isKitbashed && isLouen && isAncillaryTarget
            },
            (context) => {
                if(!context.character) return 
                if(!context.ancillary) return
                
                const character = WrapICharacterObjectToCharacter(context.character())

                setTimeout( () => {
                    character.AddAnciliary("admiralnelson_wh2_dlc12_anc_armour_brt_armour_of_brilliance_legs")
                }, 100)

                setTimeout( () => {
                    character.AddAnciliary("admiralnelson_louen_royal_pauldrons_pauldrons_item_key")
                }, 1200)
    
            },
            true
        )

        core.add_listener(
            "add additional louen item when receiving -> The Sword of Couroune",
            "CharacterAncillaryGained",
            (context) => {
                if(!context.character) return false
                if(!context.ancillary) return false
                
                const character   = x.WrapICharacterObjectToCharacter(context.character())
                const isKitbashed = x.KitbashedCharacter.TryCast(character) != null
                const isLouen     = character.SubtypeKey == "wh_main_brt_louen_leoncouer"
                const isAncillaryTarget = context.ancillary() == "wh_main_anc_weapon_the_sword_of_couronne"
    
                return isKitbashed && isLouen && isAncillaryTarget
            },
            (context) => {
                if(!context.character) return 
                if(!context.ancillary) return
                
                const character = WrapICharacterObjectToCharacter(context.character())

                setTimeout( () => {
                    character.AddAnciliary("wh_main_anc_armour_the_lions_shield")
                }, 100)
    
            },
            true
        )

        core.add_listener(
            "this trigger awards louen his crown when unification research is completed!",
            "ResearchCompleted", 
            (context) => {
                if(!context.faction) return false
                if(!context.technology) return false

                const faction = WrapIFactionScriptToFaction(context.faction())
                const isResearchMetTarget = context.technology() == "wh_dlc07_tech_brt_heraldry_unification"
                const isFactionKingLouen  = faction?.FactionKey  == "wh_main_brt_bretonnia"
                if(!isFactionKingLouen) return false


                return isResearchMetTarget && isFactionKingLouen
            },
            (context) => {
                if(!context.faction) return false
                if(!context.technology) return false

                const faction = WrapIFactionScriptToFaction(context.faction())
                const factionLeader = faction?.FactionLeader
                if(factionLeader == null) return

                //assert! faction is leader must be Louen!
                const isFactionLeaderLouen = factionLeader.SubtypeKey == "wh_main_brt_louen_leoncouer"
                if(!isFactionLeaderLouen) return

                setTimeout(() => {
                    factionLeader.AddAnciliary("admiralnelson_louen_royal_crown_item_key")
                }, 1000)
            },
            true
        )

        core.add_listener(
            "award his Royal cape: if region of wh3_main_combi_region_castle_carcassonne is taken by Louen Himself by force",
            "CharacterPerformsSettlementOccupationDecision",
            (context) => {
                if(!context.character) return false

                const characterPosition = WrapICharacterObjectToCharacter(context.character()).CurrentRegionKey
                const factionKey        = WrapICharacterObjectToCharacter(context.character()).FactionKey

                const isAroundCourounne = characterPosition == "wh3_main_combi_region_castle_carcassonne"
                const isFactionLouen    =  factionKey == "wh_main_brt_bretonnia"
                if(!isFactionLouen) return false

                const faction      = WrapIFactionScriptToFaction(context.character().faction())
                if(faction?.FactionLeader == null) return false
                const louenHimself          = x.FindCharacter(faction.FactionLeader.CqiNo)
                
                /**
                 * Why check louen has the cape? the assumption is Carcassone owned by hostile faction 
                 * and it could changes owner back and forth
                 */
                if(louenHimself == null) return false
                const kitbashedLouen        = x.KitbashedCharacter.TryCast(louenHimself)
                const isLouenHaveTheCape = kitbashedLouen?.HasAmouryItemInCharacter("louen_admiralnelson_louen_royal_cape_item_key")


                return isAroundCourounne && isFactionLouen && !isLouenHaveTheCape
            },
            (context) => {
                if(!context.character) return

                const faction      = WrapIFactionScriptToFaction(context.character().faction())
                const louenHimself = faction?.FactionLeader
                setTimeout(() => {
                   louenHimself?.AddAnciliary("admiralnelson_louen_royal_cape_item_key")
                }, 300)
            },
            true
        )

        core.add_listener(
            "award his Royal cape: if Carcassonne is join Louen",
            "FactionJoinsConfederation",
            (context) => {
                if(!context.confederation) return false
                if(!context.faction) return false

                                
                const thisFaction = WrapIFactionScriptToFaction(context.faction())
                const thisFactionKey = thisFaction?.FactionKey
                const isThisFactionKeyLouenFaction = thisFactionKey == "wh_main_brt_bretonnia"
                if(!isThisFactionKeyLouenFaction) return false

                const factionToConfederate = WrapIFactionScriptToFaction(context.confederation())
                const factionKey = factionToConfederate?.FactionKey
                const isFactionKeyCarcassone = factionKey == "wh_main_brt_carcassonne"

                return isFactionKeyCarcassone && isThisFactionKeyLouenFaction
            },
            (context) => {
                if(!context.faction) return false

                const thisFaction = WrapIFactionScriptToFaction(context.faction())
                const louenHimself = thisFaction?.FactionLeader

                setTimeout(() => {
                    louenHimself?.AddAnciliary("admiralnelson_louen_royal_crown_item_key")
                }, 300)
            },
            true
        )

        core.add_listener(
            "award his Battle Crown when Errantry war is triggered (Chivalry > 1000)",
            "idk what even to check here",
            (context) => {
                if(!context.faction) return false
                
                const faction = WrapIFactionScriptToFaction(context.faction())
                if(faction == null) return false
                const isFactionKingLouen = faction.FactionKey === "wh_main_brt_bretonnia"
                if(!isFactionKingLouen) return false

                const totalChivalry = faction.GetPooledResource("brt_chivalry")
                const isChivalryAbove1000 = totalChivalry > 1000

                if(faction.FactionLeader == null) return false
                const louenHimself = x.KitbashedCharacter.TryCast(TrustMeThisCast<BretonniaInGameKitbash.Character>(faction.FactionLeader))
                const isLouenHaveBattleCrown = louenHimself?.HasAmouryItemInCharacter("admiralnelson_louen_royal_battle_crown_item_key")

                return isChivalryAbove1000 && !isLouenHaveBattleCrown
            },
            (context) => {
                if(!context.faction) return false
                
                const faction = WrapIFactionScriptToFaction(context.faction())
                const louenHimself = x.KitbashedCharacter.TryCast(TrustMeThisCast<BretonniaInGameKitbash.Character>(faction.FactionLeader))

                setTimeout(() => {
                    louenHimself?.AddAnciliary("admiralnelson_louen_royal_battle_crown_item_key")
                }, 300)
            },
            true
        )
    })

}