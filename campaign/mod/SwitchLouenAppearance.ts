namespace LouenArmoury {
    
    const x = BretonniaInGameKitbash

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "wh_main_brt_louen_leoncouer",
        (agentKey, characther) => {
            console.warn("Changing louen appearance!")
            characther.ChangeModelAppearance("wh_main_art_set_brt_louen_leoncoeur_armoury_override")
        }
    )

    function IsBretonnianFactionControlledByHuman() {
        const isMorgiana = GetFactionByKey("wh_main_brt_carcassonne")?.IsHuman
        const isRepanse  = GetFactionByKey("wh2_dlc14_brt_chevaliers_de_lyonesse")?.IsHuman
        const isAlberic  = GetFactionByKey("wh_main_brt_bordeleaux")?.IsHuman

        return isMorgiana || isRepanse || isAlberic
    }

    function ApplyKingLouenArmouryForAI(faction: Faction) {
        console.log("OK, we are in")

        const currentTurn = GetTurnNumber()
        const louenHimself = faction?.FactionLeader
        if(!louenHimself) return

        console.log("Executing")

        const isHumanControlledAnyBret = IsBretonnianFactionControlledByHuman()
        const stage1 = isHumanControlledAnyBret ? 15 : 2
        const stage2 = isHumanControlledAnyBret ? 30 : 5  
        const stage3 = isHumanControlledAnyBret ? 50 : 10
        const stage4 = isHumanControlledAnyBret ? 70 : 12
        const stage5 = isHumanControlledAnyBret ? 90 : 15

        switch (currentTurn) {
            //give louen his armour
            case stage1:
                louenHimself.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance", true, true)
                break

            case stage1 + 1:
                louenHimself.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance_legs", true, true)
                break

            //give louen his sword
            case stage2:
                louenHimself.AddArmoryItem("kitbasher_louen_wh_main_anc_weapon_the_sword_of_couronne", true, true)
        
                break

            //give louen his shield
            case stage2 + 1:
                louenHimself.AddArmoryItem("kitbasher_louen_wh_main_anc_armour_the_lions_shield", true, true)

                break
            
            //give louen his cape
            case stage3:
                louenHimself.AddArmoryItem("louen_admiralnelson_louen_royal_cape_item_key", true, true)

                break

            //give louen his crown
            case stage4:
                louenHimself.AddArmoryItem("kitbasher_head_louen_crown", true, true)


                break

            //really late game: give louen his battle crown and talisman of preservation
            case stage5:
                louenHimself.AddArmoryItem("kitbasher_head_louen_battle_crown" ,true, true)
                louenHimself.AddArmoryItem("louen_wh_main_anc_talisman_talisman_of_preservation", true, true)

                break
            default:
                console.log("At least we know it didn't do anything")
                break;
        }
    }

    OnCampaignStart( () => {

        //TESTED OK
        core.add_listener(
            "add additional louen item when receiving -> The Armour of Briliance",
            "FactionGainedAncillary",
            (context) => {
                if(!context.faction) return false
                if(!context.ancillary) return false

                
                const faction = WrapIFactionScriptToFaction(context.faction())
                if(!faction) return false

                const isFactionCouroune = faction.FactionKey == "wh_main_brt_bretonnia"
                if(!isFactionCouroune) return false

                const factionLeader = faction.FactionLeader
                if(!factionLeader) return false

                const isLouen     = factionLeader.SubtypeKey == "wh_main_brt_louen_leoncouer"
                const isKitbashed = x.KitbashedCharacter.TryCast(TrustMeThisCast(factionLeader)) != null
                const isAncillaryTarget = context.ancillary() == "wh2_dlc12_anc_armour_brt_armour_of_brilliance"
    
                return isKitbashed && isLouen && isAncillaryTarget
            },
            (context) => {
                if(!context.faction) return 
                if(!context.ancillary) return
                
                const faction = WrapIFactionScriptToFaction(context.faction())
                if(!faction) return

                const character = faction.FactionLeader
                if(!character) return

                console.log("triggering armour on wh2_dlc12_anc_armour_brt_armour_of_brilliance")

                // THIS DOESN'T WORK
                // setTimeout( () => {
                //     character.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance")
                //     character.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance_legs")
                //     character.AddArmoryItem("kitbasher_pauldrons_louen_the_armour_of_briliance")
                // }, 100)


                //This does. why? cus fuck you that's warscape for you.
                setTimeout( () => {
                    character.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance", true, true)
                }, 100)

                setTimeout( () => {
                    character.AddArmoryItem("louen_wh2_dlc12_anc_armour_brt_armour_of_brilliance_legs", true, true)
                }, 125)

                setTimeout(() => {
                    character.AddArmoryItem("kitbasher_pauldrons_louen_the_armour_of_briliance", true, true)
                }, 150)
    
            },
            true
        )

        //TESTED OK
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
                    character.AddArmoryItem("kitbasher_louen_wh_main_anc_armour_the_lions_shield", true, true)
                }, 100)
    
            },
            true
        )

        //UNTESTED
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
                    factionLeader.AddAnciliary("admiralnelson_louen_royal_crown_item_key", true, false)
                }, 1000)
            },
            true
        )

        //UNTESTED
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
                const louenHimself          = faction.FactionLeader
                
                /**
                 * Why check louen has the cape? the assumption is Carcassone owned by hostile faction 
                 * and it could changes owner back and forth
                 */
                if(louenHimself == null) return false
                const kitbashedLouen        = x.KitbashedCharacter.TryCast(TrustMeThisCast(louenHimself))
                const isLouenHaveTheCape = kitbashedLouen?.HasAmouryItemInCharacter("louen_admiralnelson_louen_royal_cape_item_key")


                return isAroundCourounne && isFactionLouen && !isLouenHaveTheCape
            },
            (context) => {
                if(!context.character) return

                const faction      = WrapIFactionScriptToFaction(context.character().faction())
                const louenHimself = faction?.FactionLeader

                setTimeout(() => {
                   louenHimself?.AddAnciliary("admiralnelson_louen_royal_cape_item_key", true, false)
                }, 300)
            },
            true
        )

        //TESTED ok
        core.add_listener(
            "award his Royal cape: if Carcassonne is join Louen",
            "FactionJoinsConfederation",
            (context) => {
                if(!context.confederation) return false
                if(!context.faction) return false

                                
                const thisFaction = WrapIFactionScriptToFaction(context.confederation())
                const thisFactionKey = thisFaction?.FactionKey
                const isThisFactionKeyLouenFaction = thisFactionKey == "wh_main_brt_bretonnia"
                if(!isThisFactionKeyLouenFaction) return false

                const factionToConfederate = WrapIFactionScriptToFaction(context.faction())
                const factionKey = factionToConfederate?.FactionKey
                const isFactionKeyCarcassone = factionKey == "wh_main_brt_carcassonne"
                const louenHimself          = thisFaction?.FactionLeader
                
                /**
                 * Why check louen has the cape? 
                 * there could be case that Louen could already own some part of Carcassone already which could trigger
                 * the cape award script previously
                 */
                if(louenHimself == null) return false
                const kitbashedLouen        = x.KitbashedCharacter.TryCast(TrustMeThisCast(louenHimself))
                const isLouenHaveTheCape = kitbashedLouen?.HasAmouryItemInCharacter("louen_admiralnelson_louen_royal_cape_item_key")


                return isFactionKeyCarcassone && isThisFactionKeyLouenFaction && !isLouenHaveTheCape
            },
            (context) => {
                if(!context.confederation) return false

                const thisFaction = WrapIFactionScriptToFaction(context.confederation())
                const louenHimself = thisFaction?.FactionLeader

                setTimeout(() => {
                    louenHimself?.AddAnciliary("louen_admiralnelson_louen_royal_cape_item_key", true, false)
                }, 300)
            },
            true
        )

        //TESTED OK
        core.add_listener(
            "award his Battle Crown when Errantry war is triggered (Chivalry > 1000)",
            "FactionTurnStart",
            (context) => {
                if(!context.faction) return false
                
                const faction = WrapIFactionScriptToFaction(context.faction())
                if(faction == null) return false
                const isFactionKingLouen = faction.FactionKey === "wh_main_brt_bretonnia"
                if(!isFactionKingLouen) return false

                const totalChivalry = faction.GetPooledResource("brt_chivalry")
                const isChivalryAbove10000 = totalChivalry > 10000

                if(faction.FactionLeader == null) return false
                const louenHimself = x.KitbashedCharacter.TryCast(TrustMeThisCast(faction.FactionLeader))
                if(louenHimself == null) return false
                
                const isLouenHaveBattleCrown = louenHimself.HasAmouryItemInCharacter("kitbasher_head_louen_battle_crown")
                const isLouenHaveCrown       = louenHimself.HasAmouryItemInCharacter("kitbasher_head_louen_crown")


                return isChivalryAbove10000 && !isLouenHaveBattleCrown && isLouenHaveCrown
            },
            (context) => {
                if(!context.faction) return
                
                const faction = WrapIFactionScriptToFaction(context.faction())
                if(faction == null) return
                const louenHimself = x.KitbashedCharacter.TryCast(TrustMeThisCast(faction.FactionLeader))

                setTimeout(() => {
                    louenHimself?.AddAnciliary("admiralnelson_louen_royal_battle_crown_item_key", true, false)
                }, 300)
            },
            true
        )

        //TESTED OK
        core.add_listener(
            "for AI only",
            "FactionTurnStart",
            (context) => {
                if(!context.faction) return false

                const faction = WrapIFactionScriptToFaction(context.faction())
                if(faction == null) return false
                const isFactionKingLouen = faction.FactionKey === "wh_main_brt_bretonnia"
                if(!isFactionKingLouen) return false
                const isKingLouenBot  = !faction.IsHuman
                if(!isKingLouenBot) return false

                return true
            },
            (context) => {
                if(!context.faction) return

                const factionKey = context.faction().name()
                const faction = GetFactionByKey(factionKey)
                if(faction == null) return
                ApplyKingLouenArmouryForAI(faction)
            }, 
            true
        )
    })

}