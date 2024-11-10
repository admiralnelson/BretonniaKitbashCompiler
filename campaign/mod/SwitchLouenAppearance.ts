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
    })

}