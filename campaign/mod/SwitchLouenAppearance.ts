namespace LouenArmoury {
    
    const x = BretonniaInGameKitbash

    x.KitbashedCharacter.RegisterCallbackBeforeEnablingKitbash(
        "wh_main_brt_louen_leoncouer",
        (agentKey, characther) => {
            x.console.warn("Changing louen appearance!")
            characther.ChangeModelAppearance("wh_main_art_set_brt_louen_leoncoeur_armoury_override")
        }
    )

}