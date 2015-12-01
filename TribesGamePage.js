var main = function() {

//Global Variables

var CurrentPhase = 99;
var CurrentEra = 1;
var IntroPhase = 0;

var CurrentNumberOfHunters = 1;
var CurrentNumberOfCrafters = 1;
var CurrentNumberOfExplorers = 1;
var CurrentNumberOfWarriors = 1;
var CurrentPopulation = 4;

var HunterMultiplier = 1;
var CrafterMultiplier = 1;
var ExplorerMultiplier = 1;
var WarriorMultiplier = 1;

var CurrentSupply = 0;
var CurrentDomain = 0;
var CurrentInspiration = 0;
var CurrentGrip = 0;

var CurrentSupremacy = 0;
var CurrentDiscovery = 0;
var CurrentInfluence = 0;

var TotalPopulationBoomCost = 0;
var TotalInspirationSurplusCost = 0;
var TotalDomainSurplusCost = 0;
var TotalGripSurplusCost = 0;
var FestivalCost = 0;

var SupplySurplus = false;
var InspirationSurplus = false;
var DomainSurplus = false;
var GripSurplus = false;

var TotalInventionInspirationCost = 0;
var InventionLevel = 1;
var Pottery = false;
var ImprovedRaidTactics = false;
var Totems = false;
var BrushFireInnovation = false;

var Agenda = 4;
var AgendaDuration = 16;
var WarRation = 0;

var HunterExpansionBonus = 0;
var CrafterExpansionBonus = 0;
var ExplorerExpansionBonus = 0;
var WarriorExpansionBonus = 0;

var HunterToolInspirationCost = 0;
var ExplorerToolInspirationCost = 0;
var CrafterToolInspirationCost = 0;
var WarriorToolInspirationCost = 0;

var TotalExpansionDomainCost = 0;
var TotalDiscoveryDomainCost = 0;
var TotalGripCost = 0;

var ImprovedToolsLevel = 1;
var CultureLevel = 1;
var ExpansionLevel = 0;

var NumberOfForestExpansions = 0;
var NumberOfRiverExpansions = 0;
var NumberOfSavannaExpansions = 0;
var NumberOfHillExpansions = 0;
var Settlement = "";

var MapOfTheAncients = 0;
var AncientGarden = 0;
var AncientCache = 0;
var PinnacleStone = 0;
var SpearOfTheAncients = 0;

var RaidingCost = 0;
var BarteringCost = 0;

var LongTalonTribeVictoryLevel = 1;
var ShiningScalesVictoryLevel = 1;
var VictoryLevelCap = 50;
var VictoryOrLossAchieved = false;

var ShiningScalesTension = 1;
var LongTalonTribeTension = 1;
var CurrentRaidBarterThisTurn = 1;
var CurrentPopulationBoomThisTurn = 1;
var TensionCap = 30;
var ExtremeDifficulty = false;

var EventLoadedValue = 0;

var SelectedRandomTribal = "";
var SelectedRandomTribalValue = 0;
var SelectedRandomRival = "";
var SelectedRandomRivalValue = 0;
var SelectedRandomResource = "";
var SelectedRandomResourceValue = 0;
var SelectedSecondRandomResource = "";
var SelectedSecondRandomResourceValue = 0;

var WaywardAndDesperateExperienced = false;
var WaywardKindShiningScales = false;
var WaywardKindLongTalon = false;

var ShiningScalesPresent = false;
var LongTalonTribePresent = false;
var LongTalonArrivalEra = 7;

window.onload = function() {
    PopulateToolTips();
    RefreshPage();
    $('.GameZone').fadeIn();
    IntroContinue();  
};


//UI Functions---------------------------------------------------
$('#SupplyUpgrades').mouseenter(function(){
    $('#SupplyUpgrades').attr('class','ExpandedSupplyUpgradeBox');
});
$('#SupplyUpgrades').mouseleave(function(){
    $('#SupplyUpgrades').attr('class','HiddenSupplyUpgradeBox');
    ClearUpgradeInfoBox();
});

$('#DomainUpgrades').mouseenter(function(){
    $('#DomainUpgrades').attr('class','ExpandedDomainUpgradeBox');
});
$('#DomainUpgrades').mouseleave(function(){
    $('#DomainUpgrades').attr('class','HiddenDomainUpgradeBox');
    ClearUpgradeInfoBox();
});

$('#InspirationUpgrades').mouseenter(function(){
    $('#InspirationUpgrades').attr('class','ExpandedInspirationUpgradeBox');
});
$('#InspirationUpgrades').mouseleave(function(){
    $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
    ClearUpgradeInfoBox();
});

$('#GripUpgrades').mouseenter(function(){
    $('#GripUpgrades').attr('class','ExpandedGripUpgradeBox');
    if(ShiningScalesPresent){$('#ShiningScalesUpgrades').attr('class','ShownShiningScalesUpgradeBox');};
    if(LongTalonTribePresent){$('#LongTalonUpgrades').attr('class','ShownLongTalonUpgradeBox');};
});
$('#GripUpgrades').mouseleave(function(){
    $('#GripUpgrades').attr('class','HiddenGripUpgradeBox');
    if(ShiningScalesPresent){$('#ShiningScalesUpgrades').attr('class','HiddenShiningScalesUpgradeBox');};
    if(LongTalonTribePresent){$('#LongTalonUpgrades').attr('class','HiddenLongTalonUpgradeBox');};
    ClearUpgradeInfoBox();
});

$('.ToolTip').parent(this).mouseenter(function(){
    $(this).css("cursor", "help");
});
$('.ToolTip').parent(this).click(function(){
    $(this).find('.ToolTip').slideDown();
    $(this).css("position", "relative");
});

$('.ToolTip').parent(this).mouseleave(function(){$('.ToolTip').hide();});

function PopulateToolTips() {
    $('#SupremacyTip').html("Supremacy measures your dominance over the region.<br/><br/>\
                          You will gain twice your number of Expansions in Supremacy each Era. <br/><br/>\
                          You will gain your number of Expansions (including your Settlement) multiplied by your number of Warriors in Supremacy each time you Raid.");    
    $('#InfluenceTip').html("Influence measures your cultural presence in the region.<br/><br/>\
                          You will gain your number of Expansions (including your Settlement) multiplied by your Culture Level in Influence each Era and each time you Barter.");
    $('#DiscoveriesTip').html("Discoveries are relics from those that came before. Possess and utilize as many of these as you can.<br/><br/>\
                          You will find Discoveries during the Fruition phase by having an adequate surplus of Domain available.");
    
    $('#LongTalonTip').html("The Long Talons favor military prowess. They also excel in it. The more impressive the target, the more likely they are to strike.\
                             In this way, they assure none grow too large to handle.");
    $('#ShiningScalesTip').html("A tribe claiming to have descended from the Ancients of this land, they are friendly enough to who they call newcomers,\
                                but jealously work to find and protect 'their' relics.");
    
    $('#PotteryTip').html("Pottery, crafted from clay, more easily holds goods for transport and storage.\
                            <br/><br/>This increases the effectiveness of each Surplus by 0.5.");
    $('#RaidingTacticsTip').html("Innovative minds have devised methods of war that grant an edge during raids.\
                                <br/><br/>This increases the effectiveness of your Warriors during raids by 0.5.");
    $('#TotemsTip').html("Totems, crafted from stone or wood, serve as a reminder of the kin group's ancestry.\
                          <br/><br/>This increases your Influence and Supremacy gains each era as if you had twice as many regions.");
    
    $('#Path_Of_War').mouseenter(function(){
        $('#Path_Of_WarTip').html("You have chosen the Path of War. May your enemies feel your wrath!\
                                <br/><br/>A quarter of your <span style=\"color: rgb(178, 0, 0);\">Supply</span> Bounty each Era is given directly to your Raiding efforts as ration.\
                                The effectiveness of your Warriors is increased in proportion the this ration.<br/>"+AgendaDuration+" turns remaining.");
    });    
    $('#Path_Of_Peace').mouseenter(function(){
    $('#Path_Of_PeaceTip').html("You have chosen the Path of Peace. May you live long and prosper.\
                                <br/><br/>You cannot Raid, but your tension increases half as fast each era.<br/>"+AgendaDuration+" turns remaining.");
    });
    $('#Path_Of_Seclusion').mouseenter(function(){
        $('#Path_Of_SeclusionTip').html("You have chosen the Path of Seclusion. Security, Solidarity, and inner growth will be your bounty.\
                                        <br/><br/>You cannot Raid or Barter. But, your Bounty will be multiplied by 1.5. <br/>"+AgendaDuration+" turns remaining.");
    });
    
    $('#Map_Of_The_Ancients').mouseenter(function(){
            $('#Map_Of_The_AncientsTip').html("A giant plate-like stone was uncovered from its shallow grave. On this stone, several symbols come together. \
                                                 From an elevated perch nearby, the symbols make what clearly seem to be a map encompassing much of the surrounding area, \
                                                 some known but much unknown to your tribe.\
                                                 <br/><br/>At the start of each Era, gain some Domain. The amount gained increases each Era. \
                                                 <br/>Current gain: " + (MapOfTheAncients) + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    });
    
    $('#Ancient_Garden').mouseenter(function(){
            $('#Ancient_GardenTip').html("Your explorers have discovered a deeply hidden grove marked with the serpent symbol of those that came before. \
                                                 Within the grove, fruits and berries grow in abundant quantity and to great size. So too do the beasts.\
                                                 <br/><br/> At the start of each Era, gain some Supply. The amount gained increases each Era. \
                                                 <br/>Current gain: " + (AncientGarden) + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    });
    
    $('#Ancient_Cache').mouseenter(function(){
            var CalculatedBounty = Math.floor((AncientCache + 3)/ 3);
            $('#Ancient_CacheTip').html("A cave lined with stone carved serpent motif contains a cache of tools made with strange but effective designs and materials.\
                                                 <br/><br/>At the start of each Era, gain some of each resource. The amount gained increases each Era. \
                                                 <br/>Current gain: " + CalculatedBounty + " to each.");
    });
    
    $('#Pinnacle_Stone').mouseenter(function(){
        $('#Pinnacle_StoneTip').html("The giant stone monolith at the pinnacle of this great expanse is, at a distance, a towering coiled serpent. \
                                             But, once the likewise coiling path is ascended and the monolith approached, its base contains pictographs \
                                             highlighting the life and ways of those who came before.\
                                             <br/><br/>At the start of each Era, gain some Inspiration. The amount gained increases each Era. \
                                             <br/>Current gain: " + (PinnacleStone) + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    });
    
    $('#Spear_Of_The_Ancients').mouseenter(function(){
        $('#Spear_Of_The_AncientsTip').html("An alien spear is found lodged in the roots of an ancient tree. The shaft of the spear is appears wrapped \
                                             in serpents and the head shines like the sun. The weapon is found to best any match when tested.\
                                             <br/><br/> At the start of each Era, gain some Grip. The amount gained increases each Era. \
                                             <br/>Current gain: " + (SpearOfTheAncients) + " <span style=\"color: grey;\">Grip</span>");
    });
    
    $('#LongTalonTribeTensionTip').html("Tension represents dormant hostility between your tribes. The higher the Tension score, the more likely you are to be raided by this rival.\
                                        <br/><br/>Tension with the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> will increase at a faster rate as your Supremacy increases. Tensions increase at a faster rate as the game progresses. Raiding a Tribe will increase Tension significantly.\
                                        <br/><br/>Bartering with a rival will decrease Tensions in proportion to your Culture score.");
    
    $('#ShiningScalesTensionTip').html("Tension represents dormant hostility between your tribes. The higher the Tension score, the more likely you are to be raided by this rival.\
                                        <br/><br/>Tension with the <span style=\"color: GoldenRod;\">Shining Scales</span> will increase at a faster rate as you uncover more discoveries. Tensions increase at a faster rate as the game progresses. Raiding a Tribe will increase Tension significantly.\
                                        <br/><br/>Bartering with a rival will decrease Tensions in proportion to your Culture score.");
    
    $('#ShiningScalesVictoryTip, #LongTalonTribeVictoryTip').html("If a Rival reaches their victory cap, the game ends and your tribe is lost to history.\
                                    <br/><br/>Furthermore, the closer a rival is to victory, the more potent their raids will be.\
                                    <br/><br/>Raiding a rival will decrease their Victory level in proportion to your number of warriors.");
}   

function CannotBeDone() {
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("");
    $('#UpgradeInfoBoxDescription').html("This cannot be done.");    
}

//---------------------------------------------------------------

function RefreshPage(){
    $("#NumberOfHunter").text(CurrentNumberOfHunters);
    $("#NumberOfCrafter").text(CurrentNumberOfCrafters);
    $("#NumberOfExplorer").text(CurrentNumberOfExplorers);
    $("#NumberOfWarrior").text(CurrentNumberOfWarriors);
    
    $("#HunterMultiplier").text(HunterMultiplier);
    $("#CrafterMultiplier").text(CrafterMultiplier);
    $("#ExplorerMultiplier").text(ExplorerMultiplier);
    $("#WarriorMultiplier").text(WarriorMultiplier);
    
    $("#HunterPopulationSoftCap").text(HunterExpansionBonus);
    $("#CrafterPopulationSoftCap").text(CrafterExpansionBonus);
    $("#ExplorerPopulationSoftCap").text(ExplorerExpansionBonus);
    $("#WarriorPopulationSoftCap").text(WarriorExpansionBonus);
    
    ChangeHunterStats(CurrentNumberOfHunters)
    ChangeCrafterStats(CurrentNumberOfCrafters)
    ChangeExplorerStats(CurrentNumberOfExplorers)
    ChangeWarriorStats(CurrentNumberOfWarriors)
    
    $("#StashedSupply").text(CurrentSupply);
    $("#StashedInspiration").text(CurrentInspiration);
    $("#StashedDomain").text(CurrentDomain);
    $("#StashedGrip").text(CurrentGrip);
    
    ExpansionLevel = NumberOfForestExpansions + NumberOfRiverExpansions + NumberOfSavannaExpansions + NumberOfHillExpansions + 1
    
    CalculateSurplusDisplay();
    
    $('#NumberOfExpansion').text(ExpansionLevel);
    $("#StashedSupremacy").text(CurrentSupremacy);
    $("#NumberOfDiscovery").text(CurrentDiscovery);
    $("#StashedInfluence").text(CurrentInfluence);
    $("#NumberOfCulture").text(CultureLevel);    

    CalculateTribalCosts();
    
    CalculateVictory();
    if (VictoryOrLossAchieved) {CurrentPhase = 5}
    switch (CurrentPhase) {
        case 0:
            $('#BeginEra').fadeIn();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            $('#SupplyUpgrades').show();
            $('#DomainUpgrades').show();
            $('#InspirationUpgrades').show();
            if (Agenda != 3 && ShiningScalesPresent){$('#GripUpgrades').show();}
            break;
        case 1:
            $('#BeginEra').hide();
            $('#HarvestResultBox').fadeIn();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            $('#SupplyUpgrades').hide();
            $('#DomainUpgrades').hide();
            $('#InspirationUpgrades').hide();
            $('#GripUpgrades').hide();
            break;
        case 2:
            $('#BeginEra').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').fadeIn();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            $('#SupplyUpgrades').hide();
            $('#DomainUpgrades').hide();
            $('#InspirationUpgrades').hide();
            $('#GripUpgrades').hide();
            break;
        case 4:
            $('#BeginEra').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#CompetitionResultBox').hide();
            $('#ActionResultBox').fadeIn();
            $('#EndOfGameResultBox').hide();
            $('#SupplyUpgrades').hide();
            $('#DomainUpgrades').hide();
            $('#InspirationUpgrades').hide();
            $('#GripUpgrades').hide();
            break;
        case 5:
            $('#BeginEra').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').fadeIn();
            $('#SupplyUpgrades').hide();
            $('#DomainUpgrades').hide();
            $('#InspirationUpgrades').hide();
            $('#GripUpgrades').hide();
            break;
        case 99:
            $('#IntroDiv').fadeIn(1500);
            if (IntroPhase > 5) {$('#BeginEra').fadeIn();}
            else{$('#BeginEra').hide();}
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            $('#SupplyUpgrades').hide();
            $('#DomainUpgrades').hide();
            $('#InspirationUpgrades').hide();
            $('#GripUpgrades').hide();
            break;         
        
    }   

    CompetitionDetails();
    DisplayDetails();
    ClearUpgradeInfoBox();   
        
}

function DisplayDetails() {
    $('#D_Population').html(CurrentPopulation);
    $('#D_Era').html(CurrentEra);
    $('#D_Culture').html(CultureLevel);
    $('#D_Upkeep').html(Math.floor(CurrentPopulation/3));
    
    $('#D_River').html(NumberOfRiverExpansions);
    $('#D_Savanna').html(NumberOfSavannaExpansions);
    $('#D_Forest').html(NumberOfForestExpansions);
    $('#D_Hill').html(NumberOfHillExpansions);
    
    $('#D_Supremacy').html(CurrentSupremacy);
    $('#D_Influence').html(CurrentInfluence);
    $('#D_Discoveries').html(CurrentDiscovery);
    
    $('#D_LongTalonTribeTension').html(LongTalonTribeTension);
    $('#D_LongTalonTribeVictory').html(LongTalonTribeVictoryLevel);    
    $('#D_ShiningScalesTension').html(ShiningScalesTension);
    $('#D_ShiningScalesVictory').html(ShiningScalesVictoryLevel);
    
}

function CalculateTribalCosts(){
    CurrentPopulation = CurrentNumberOfHunters + CurrentNumberOfCrafters + CurrentNumberOfExplorers + CurrentNumberOfWarriors
    
    TotalPopulationBoomCost = Math.floor(((CurrentPopulation/2) * CurrentPopulationBoomThisTurn) * Math.pow(1.07,CurrentPopulationBoomThisTurn));
 
    TotalInspirationSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfCrafters)));

    TotalDomainSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfExplorers)));

    TotalGripSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfWarriors)));

    HunterToolInspirationCost = Math.floor((10 * HunterMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    CrafterToolInspirationCost = Math.floor((10 * CrafterMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    ExplorerToolInspirationCost = Math.floor((10 * ExplorerMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    WarriorToolInspirationCost = Math.floor((10 * WarriorMultiplier) * Math.pow(1.07,ImprovedToolsLevel));    
    
    TotalExpansionDomainCost = Math.floor(8 * Math.pow(1.15,ExpansionLevel));
    
    TotalCultureInspirationCost = Math.floor((5 * CultureLevel) * Math.pow(1.07,CultureLevel));

    TotalDiscoveryDomainCost = Math.floor((25 * (CurrentDiscovery+1)) * Math.pow(1.07,(CurrentDiscovery)));
    
    TotalInventionInspirationCost = Math.floor((30 * InventionLevel) * Math.pow(1.15,InventionLevel));
    
    RaidingCost = Math.floor((4 * CurrentRaidBarterThisTurn) * Math.pow(1.15,CurrentRaidBarterThisTurn));
    
    BarteringCost = Math.floor((4 * CurrentRaidBarterThisTurn) * Math.pow(1.15,CurrentRaidBarterThisTurn));
    
    FestivalCost = Math.floor(2 * Math.pow(1.15,CurrentPopulation));
}

function CompetitionDetails() {
    //each tribe will have a scale of 1-30 tension and 1-50 victory   
    switch (true) {
        case (ShiningScalesTension < (TensionCap / 2.8)):
            $('#D_ShiningScalesTension').css('color','Green')
            break;
        case (ShiningScalesTension < (TensionCap / 1.6)):
            $('#D_ShiningScalesTension').css('color','Yellow')
            break;
        case (ShiningScalesTension < (TensionCap / 1.2)):
            $('#D_ShiningScalesTension').css('color','Orange')
            break;
        default:
            $('#D_ShiningScalesTension').css('color','Red')
            break;
    }
    
    switch (true) {
        case (LongTalonTribeTension < (TensionCap / 2.8)):
            $('#D_LongTalonTribeTension').css('color','Green')
            break;
        case (LongTalonTribeTension < (TensionCap / 1.6)):
            $('#D_LongTalonTribeTension').css('color','Yellow')
            break;
        case (LongTalonTribeTension < (TensionCap / 1.2)):
            $('#D_LongTalonTribeTension').css('color','Orange')
            break;
        default:
            $('#D_LongTalonTribeTension').css('color','Red')
            break;
    }    


}

function CalculateSurplusDisplay(){
    if (SupplySurplus && !(Pottery)) {$('#SupplySurplusDenotion').html("<span style=\"color: Gold;\"> +2</span>")
    }else if (SupplySurplus && Pottery) {$('#SupplySurplusDenotion').html("<span style=\"color: Gold;\"> +2.5</span>")
    }else{$('#SupplySurplusDenotion').html("")}
    if (DomainSurplus && !(Pottery)) {$('#DomainSurplusDenotion').html("<span style=\"color: Gold;\"> +2</span>")
    }else if (DomainSurplus && Pottery) {$('#DomainSurplusDenotion').html("<span style=\"color: Gold;\"> +2.5</span>")
    }else {$('#DomainSurplusDenotion').html("")}
    if (InspirationSurplus && !(Pottery)) {$('#InspirationSurplusDenotion').html("<span style=\"color: Gold;\"> +2</span>")
    }else if (InspirationSurplus && Pottery) {$('#InspirationSurplusDenotion').html("<span style=\"color: Gold;\"> +2.5</span>")
    }else {$('#InspirationSurplusDenotion').html("")}
    if (GripSurplus  && !(Pottery)) {$('#GripSurplusDenotion').html("<span style=\"color: Gold;\"> +2</span>")
    }else if (GripSurplus && Pottery) {$('#GripSurplusDenotion').html("<span style=\"color: Gold;\"> +2.5</span>")
    }else {$('#GripSurplusDenotion').html("")}
}

function CalculateVictory() {
    
    if (CurrentDiscovery > 4) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Green;\">VICTORY</span>");
        $('#EndOfGameParagraph').html("You've Won the game via Discovery");
        $('#DiscoveryVictory').show();
        $('#SupremacyVictory').hide();
        $('#InfluenceVictory').hide();
    }
    
    if (CurrentSupremacy > 499) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Green;\">VICTORY</span>");
        $('#EndOfGameParagraph').html("You've Won the game via Supremacy");
        $('#DiscoveryVictory').hide();
        $('#SupremacyVictory').show();
        $('#InfluenceVictory').hide();
    }
    
    if (CurrentInfluence > 499) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Green;\">VICTORY</span>");
        $('#EndOfGameParagraph').html("You've Won the game via Influence");
        $('#DiscoveryVictory').hide();
        $('#SupremacyVictory').show();
        $('#InfluenceVictory').hide();
    }
    
    if (ShiningScalesVictoryLevel >= VictoryLevelCap) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Red;\">DEFEAT</span>");
        $('#EndOfGameParagraph').html("The <span style=\"color: GoldenRod;\">Shining Scales</span> have won the game via Discovery");
        $('#DiscoveryVictory').show();
        $('#SupremacyVictory').hide();
        $('#InfluenceVictory').hide();
        
    }
    if (LongTalonTribeVictoryLevel >= VictoryLevelCap) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Red;\">DEFEAT</span>");
        $('#EndOfGameParagraph').html("The <span style=\"color: OrangeRed;\">Long Talon Tribe</span> has won the game via Supremacy");
        $('#DiscoveryVictory').hide();
        $('#SupremacyVictory').show();
        $('#InfluenceVictory').hide();
        
    }
    
    if (CurrentPopulation < 1) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Red;\">DEFEAT</span>");
        $('#EndOfGameParagraph').html("Your Tribe is no more...");
        $('#DiscoveryVictory').hide();
        $('#SupremacyVictory').hide();
        $('#InfluenceVictory').hide();
        
    }    
}

function ClearUpgradeInfoBox() {
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("");
    $('#UpgradeInfoBoxDescription').html("");
}

    //Adjust stats for Resources
function ChangeHunterStats(NoH){
    var Calc = 0;    
    Calc = Math.floor(NoH*HunterMultiplier);    
    $('#ExpectedSupply').text(Calc);
}

function ChangeCrafterStats(NoC){
    var Calc = 0;
    Calc = Math.floor(NoC*CrafterMultiplier);    
    $('#ExpectedInspiration').text(Calc);
}

function ChangeExplorerStats(NoE){
    var Calc = 0;
    Calc = Math.floor(NoE*ExplorerMultiplier);
    $('#ExpectedDomain').text(Calc);
}

function ChangeWarriorStats(NoW){
    var Calc = 0;
    Calc = Math.floor(NoW*WarriorMultiplier);
    $('#ExpectedGrip').text(Calc);
}

//Caculate Era Results.----------------------------------------------------------------------------
$('#BeginEra').mouseenter(function(){
    $('#UpgradeInfoBoxCost').html("");
    if (CurrentPhase != 99) {
        $('#UpgradeInfoBoxHeader').html("<span class=\"LargerText;\">Begin Fruition</span>");
        $('#UpgradeInfoBoxDescription').html("Leave the Provision Phase and begin the Fruition Phase.");
    }
})
$('#BeginEra').mouseleave(function(){ClearUpgradeInfoBox();})
$('#BeginEra').click(BeginEra);
function BeginEra() {    
    if (CurrentPhase == 99) {
        $('#HarvestResultBox').fadeIn();
        CalculateHuntingResult();
        $('#IntroDiv').hide();
        $('#BeginEra').hide();
        $("#StashedSupply").text(CurrentSupply);
    }else{
        CurrentPhase = 1;
        // Calculate returns from Hunting/Crafting/Exploring
        CalculateHuntingResult();
        CalculateCraftingResult();
        CalculateExploringResult();
        CalculateWarResult();
        CalculateNewTribeMemberResult();
        
        //Clear All Boosters (must remain after returns calculated)
        SupplySurplus = false
        InspirationSurplus = false
        DomainSurplus = false
        GripSurplus = false
        
        //Increase Discovery Level
        if (MapOfTheAncients > 0) {CalculateMapOfTheAncients()}
        if (AncientGarden > 0) {CalculateAncientGarden()}
        if (AncientCache > 0) {CalculateAncientCache()}
        if (PinnacleStone > 0) {CalculatePinnacleStone()}
        if (SpearOfTheAncients > 0) {CalculateSpearOfTheAncients()}
    
        CurrentRaidBarterThisTurn--;
        if (CurrentRaidBarterThisTurn < 1) {CurrentRaidBarterThisTurn = 1}
        CurrentPopulationBoomThisTurn--;
        if (CurrentPopulationBoomThisTurn < 1) {CurrentPopulationBoomThisTurn = 1}

        CalculateVictoryConditionGains();
        CalculateEraTensionIncrease();
        CalculateEraVictoryIncrease();
        
        if (Agenda != 0) {
            AgendaDuration--
            if (AgendaDuration < 1) {
                Agenda = 0
            }
        }
        switch (Agenda) {
            case 0:
                $('#Path_Of_War').hide();
                $('#Path_Of_Peace').hide();
                $('#Path_Of_Seclusion').hide();
                break;
            case 1:
                $('#Path_Of_War').show();
                $('#Path_Of_Peace').hide();
                $('#Path_Of_Seclusion').hide();
                break;
            case 2:
                $('#Path_Of_Peace').show();
                $('#Path_Of_War').hide();
                $('#Path_Of_Seclusion').hide();
                break;
            case 3:
                $('#Path_Of_Seclusion').show();
                $('#Path_Of_War').hide();
                $('#Path_Of_Peace').hide();
                break;
            case 4:
                $('#Path_Of_Seclusion').hide();
                $('#Path_Of_War').hide();
                $('#Path_Of_Peace').hide();
                break;
            default:
                break;            
        }
        RefreshPage();
    }
}

$('#Intro_Continue').click(IntroContinue);
function IntroContinue() {
    IntroPhase++
    $("#IntroDivStory").hide();
    $("#Intro_Continue").hide();
    switch (IntroPhase) {
        case 1:
            $("#IntroDivHeader").html("Before we begin...");
            $("#IntroDivStory").html("<br/><br/>Select A Difficulty.");
            $("#IntroDivStory, #IntroDivHeader, #Difficulty_Normal, #Difficulty_Extreme").fadeIn(1000);
            break;
        case 2:
            $("#IntroDivHeader").html("Before we begin...");
            $("#IntroDivStory").html("If you know the introduction story and are familiar with the rules of Pinnacle Stone, \
              select the \'skip intro\' button. Otherwise, select \'Continue\'.");
            $("#IntroDivStory, #Intro_Continue, #Intro_Skip").fadeIn(1000);
            break;
        case 3:
            $("#Intro_Skip").hide();
            $("#IntroDivHeader").hide();
            $("#IntroDivHeader").html("The Plan");
            $("#IntroDivStory").html("So few agreed to come.  Fewer still will heed the call when it is truly time to embark. Many called you a liar.  Others still said the serpent was a foul vision through the veil of a fever dream.")
            $("#IntroDivStory, #IntroDivHeader, #Intro_Continue").fadeIn(1000);
            break;
        case 4:
            $("#IntroDivStory").html("It was no mere vision.  No, it was a sight of some glory. You saw it with clear eyes and a clear mind. A giant stone serpent with eyes the color of blood sat perched and still atop a rise; a stonework creature surrounded by land ripe for settling.")
            $("#IntroDivStory, #Intro_Continue").fadeIn(1000);
            break;
        case 5:
            $("#IntroDivStory").html("You are going.  You must. You are taking your kin and those bravery and wisdom to join. First, though, you must gather supplies.")
            $("#IntroDivStory, #Intro_Continue").fadeIn(1000);
            break;
        case 6:
            $("#IntroDivHeader").hide();
            $("#IntroDivHeader").text("Preparing for the journey");
            $("#IntroDivStory").hide();
            $("#IntroDivStory").html("Select \"Begin\" to begin the Fruition phase. During Fruition, you will reap the labor of your workers. \
                                     <br/>Right now, you are but a lone Hunter. You will gain 1 <span style=\"color: rgb(178, 0, 0);\">Supply</span> for each hunter you have, multiplied by your Hunter Efficiency.\
                                     <br/><br/><span style=\"color: rgb(178, 0, 0);\">Supply</span> will support your population as well as allow spurts in productivity and population by expending your surpluses.\
                                     <br/><br/>Collect 5 <span style=\"color: rgb(178, 0, 0);\">Supply</span> to begin recruiting.");
            $("#IntroDivStory, #IntroDivHeader, #HunterPanel, #BeginEra").fadeIn(1000);
            break;
        case 7:
            $("#IntroDivHeader").hide();
            $("#IntroDivHeader").text("Preparing for the journey");
            $("#IntroDivStory").html("With ample <span style=\"color: rgb(178, 0, 0);\">Supply</span>, you feel prepared. But, you'll need someone to explore and tame this new world.\
                                     Luckily, an explorer heeds your call and chooses to join you.");
            $("#IntroDivStory, #IntroDivHeader, #ExplorerPanel, #Intro_Continue").fadeIn(1000);
            $("#BeginEra").hide();
            break;
        case 8:
            $("#IntroDivStory").html("Once you settle, explorers accumulate <span style=\"color: rgb(207, 166, 0);\">Domain</span> for your tribe.\
                                     <span style=\"color: rgb(207, 166, 0);\">Domain</span> can be used to expand your settlement and search the mysterious surroundings.");
            $("#IntroDivStory,#Intro_Continue").fadeIn(1000);
            break;
        case 9:
            $("#IntroDivStory").html("A crafter insists you bring her and her young to this giant serpent of stone. Her skills will be invaluable once you arrive.\
                                     <br/><br/>Crafters generate <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>, which they use to improve the efficiency of endeavors. With enough stashed <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>, a crafter could pursue a new invention.");
            $("#IntroDivStory, #CrafterPanel, #Intro_Continue").fadeIn(1000);
            break;
        case 10:
            $("#IntroDivStory").html("With these, and a handful of unskilled young and elderly, the time has come. You are ready to embark.");
            $("#IntroDivStory, #Intro_Continue").fadeIn(1000);
            break;
        case 11:
            $("#IntroDivHeader").hide();
            $("#IntroDivHeader").text("New World");
            $("#IntroDivStory").html("You have just led your new tribe from their original home, drawn to the wonder and prosperity of this mysterious place. \
                                     But, you can see the tell tale signs that your own is not the only kin here.\
                                     <br/><br/>The oldest of your new tribe presents himself to you as a seasoned warrior.\
                                     Though his age shows him as weak, in the eyes of the old man you see that he speaks earnestly. He offers his services and you feel inclined to accept.")
            $("#IntroDivStory, #IntroDivHeader, #Intro_Continue, #WarriorPanel").fadeIn(1000);
            break;
        case 12:
            $("#IntroDivStory").html("Warriors will serve as raiders, protectors, and diplomats for your tribe. They demand respect and reverence from any outsiders.\
                                     As time progresses, they produce <span style=\"color: grey;\">Grip</span>, which represents your hold over the territory you have.")
            $("#IntroDivStory, #IntroDivHeader, #Intro_Continue").fadeIn(1000);
            $("#BeginEra").hide();
            break;
        case 13:
            $("#IntroDivHeader").text("New World");
            $("#IntroDivStory").html("With a handful of resources and your kin you set out to mark your place. \
                                     They look to you to make the decision; Where will you settle?")
            $("#IntroDivStory, #IntroDivHeader, #IntroDiv .Upgrade").fadeIn(1000);
            $("#BeginEra").hide();
            break;
    }
}

$('#Difficulty_Normal').click(function(){DifficultyNormal()});
function DifficultyNormal() {
    $("#Difficulty_Normal, #Difficulty_Extreme").hide();
    IntroContinue()
};

$('#Difficulty_Extreme').click(function(){DifficultyExtreme()});
function DifficultyExtreme() {
    ExtremeDifficulty = true;
    TensionCap = 20;
    VictoryLevelCap = 40;
    $('.VictoryLevelCap').text("40");
    $("#Difficulty_Normal, #Difficulty_Extreme").hide();
    IntroContinue();
};

$('#Intro_Skip').click(function(){SkipIntro()});
function SkipIntro() {
    $('#Intro_Skip').hide();
    IntroPhase= 12;
    IntroContinue();
};

function CalculateNewTribeMemberResult() {
    var UpkeepCost = Math.floor(CurrentPopulation/3)
    if (CurrentSupply - UpkeepCost >= 0) {
        $("#UpkeepResult").html(UpkeepCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was consumed for Upkeep.")
        DecrementSupply(UpkeepCost)
        
        if (CurrentPopulation < (5+(ExpansionLevel*3))) {
            SelectAndAddRandomNeededTribal();
            $('#NewTribeMemberResult').html("A new "+ SelectedRandomTribal +" is raised.")
        }else{$('#NewTribeMemberResult').html("")}  
    }else{
        $("#UpkeepResult").html(CurrentSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was consumed for Upkeep but it wasn't enough to stay hunger and the elements for all.")
        DecrementSupply(CurrentSupply)
         SelectAndRemoveSelectedRandomTribal();
        $('#NewTribeMemberResult').html("A "+ SelectedRandomTribal +" has died do to a lack of <span style=\"color: rgb(178, 0, 0);\">Supply</span>.")
    }
}

function CalculateEraTensionIncrease() {
if (Agenda == 2){
        if(LongTalonTribePresent){LongTalonTribeTension = LongTalonTribeTension + Math.floor(((CurrentEra/8) * ((CurrentSupremacy/100)+1))/2);};
        ShiningScalesTension = ShiningScalesTension + Math.floor((((CurrentEra/10)+1) * (CurrentDiscovery+1))/2);
    }else{
        if(LongTalonTribePresent){LongTalonTribeTension = LongTalonTribeTension + Math.floor((CurrentEra/8) * ((CurrentSupremacy/100)+1));};
        ShiningScalesTension = ShiningScalesTension + Math.floor(((CurrentEra/10)+1) * (CurrentDiscovery+1));
    }
}

function CalculateVictoryConditionGains() {    
    if (Totems) {
        CurrentSupremacy = CurrentSupremacy + (ExpansionLevel * 2);
        CurrentInfluence = CurrentInfluence + (CultureLevel * 2);
    }else {
        CurrentSupremacy = CurrentSupremacy + (ExpansionLevel);
        CurrentInfluence = CurrentInfluence + (CultureLevel);
    }
}

$('#HarvestContinueButton').click(ContinueToEvent);
function ContinueToEvent() {
    if (CurrentPhase == 99) {
        $("#StashedSupply").text(CurrentSupply);
        $("#IntroDivStory").html("<br/><br/>Collect 5 <span style=\"color: rgb(178, 0, 0);\">Supply</span> to begin recruiting.");
        RefreshPage();
        if (CurrentSupply > 4) {IntroContinue();}
    }else{
        CurrentPhase = 2;
        if (VictoryOrLossAchieved) {CurrentPhase = 5}
        CalculateEvent();
        RefreshPage();
    }
}

//Bounty Calculations---------------------------------------------------
function CalculateHuntingResult() {
    var MultiplierBoon = HunterMultiplier
    if (SupplySurplus) {MultiplierBoon = MultiplierBoon + 2}
    if (SupplySurplus && Pottery) {MultiplierBoon = MultiplierBoon + 0.5}
    var Calc = Math.floor(CurrentNumberOfHunters * MultiplierBoon);
    if (Agenda == 3) {Calc = Math.floor(Calc * 1.5)}
    if (Calc > 0) {
        $('#HunterResult').html(Calc+ " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was gained through hunting.");
        IncrementSupply(Calc)
        WarRation = 0;
        if (Agenda == 1) {
            WarRation = Math.floor(Calc/4);
            if (WarRation > 0) {
                $('#HunterResult').append("<br/> "+WarRation+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> was immediately rationed to support our raids.")
                DecrementSupply(WarRation);
            }else{$('#HunterResult').append("<br/> This was insufficient to aid your raiding efforts.")};

        }
    }else{$('#HunterResult').html(""); WarRation = 0;}
}

function CalculateCraftingResult() {
    var MultiplierBoon = CrafterMultiplier
    if (InspirationSurplus) {MultiplierBoon = MultiplierBoon + 2}
    if (InspirationSurplus && Pottery) {MultiplierBoon = MultiplierBoon + 0.5}
    var Calc = Math.floor(CurrentNumberOfCrafters * MultiplierBoon);
    if (Agenda == 3) {Calc = Math.floor(Calc * 1.5)}
    if (Calc > 0) {
        $('#CrafterResult').html(Calc+ " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> was gained through crafting.");
        IncrementInspiration(Calc)
    }else{$('#CrafterResult').html("");}
}

function CalculateExploringResult() {
    var MultiplierBoon = ExplorerMultiplier
    if (DomainSurplus) {MultiplierBoon = MultiplierBoon + 2}
    if (DomainSurplus && Pottery) {MultiplierBoon = MultiplierBoon + 0.5}
    var Calc = Math.floor(CurrentNumberOfExplorers * MultiplierBoon);
    if (Agenda == 3) {Calc = Math.floor(Calc * 1.5)}
    if (Calc > 0) {
        $('#ExplorerResult').html(Calc+ " <span style=\"color: rgb(207, 166, 0);\">Domain</span> was gained through exploration.");
        IncrementDomain(Calc)
    }else{$('#ExplorerResult').html("");}
}

function CalculateWarResult() {
    var MultiplierBoon = WarriorMultiplier
    if (GripSurplus) {MultiplierBoon = MultiplierBoon + 2}
    if (GripSurplus && Pottery) {MultiplierBoon = MultiplierBoon + 0.5}
    var Calc = Math.floor(CurrentNumberOfWarriors * MultiplierBoon);
    if (Agenda == 3) {Calc = Math.floor(Calc * 1.5)}
    if (Calc > 0) {
        $('#WarResult').html(Calc+ " <span style=\"color: grey;\">Grip</span> was secured by your Warriors.");
        IncrementGrip(Calc)
    }else{$('#WarResult').html("");}
}

function CalculateMapOfTheAncients() {
    if (MapOfTheAncients > 0) {
        $('#MapOfTheAncientsResult').html("Studying the Map of the Ancients grants you " +MapOfTheAncients+ " <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
        IncrementDomain(MapOfTheAncients)
        MapOfTheAncients++
        if (MapOfTheAncients > 30) {MapOfTheAncients = 30}
    }
}

function CalculateAncientGarden() {
    if (AncientGarden > 0) {
        $('#AncientGardenResult').html("Food from the Ancient Garden grants you " +AncientGarden+ " <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
        IncrementSupply(AncientGarden)
        AncientGarden++
        if (AncientGarden > 30) {AncientGarden = 30}
    }
}

function CalculateAncientCache() {
    if (AncientCache > 0) {
        var Calc = Math.floor((AncientCache + 3)/ 3);
        if (Calc > 0) {
            $('#AncientGardenResult').html("Access to the Ancient Cache grants you " +Calc+ " to each of your resource stashes.");
            IncrementSupply(Calc)
            IncrementInspiration(Calc)
            IncrementDomain(Calc)
            IncrementGrip(Calc)
            AncientCache++
            if (AncientCache > 30) {AncientCache = 30}
        }
    }
}

function CalculatePinnacleStone() {
    if (PinnacleStone > 0) {
        $('#PinnacleStoneResult').html("Living in the shadow of the Pinnacle Stone grants you " +PinnacleStone+ " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>.");
        IncrementInspiration(PinnacleStone)
        PinnacleStone++
        if (PinnacleStone > 30) {PinnacleStone = 30}
    }
}

function CalculateSpearOfTheAncients() {
    if (SpearOfTheAncients > 0) {
        $('#SpearOfTheAncientsResult').html("Possessing the Spear of the Ancients grants you " +SpearOfTheAncients+ " <span style=\"color: grey;\">Grip</span>.");
        IncrementGrip(SpearOfTheAncients)
        SpearOfTheAncients++
        if (SpearOfTheAncients > 30) {SpearOfTheAncients = 30}
    }
}

// Supply Upgrade Buttons-------------------------------------------------

$('#Population_Boom').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalPopulationBoomCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Population Boom");
    $('#UpgradeInfoBoxDescription').html("A new tribe member will join your tribe immediately so long as you have the capacity.");
});
$('#Population_Boom').click(function(){P_Population_Boom();});
function P_Population_Boom(){
    if (CurrentSupply >= TotalPopulationBoomCost && (CurrentPopulation < (5+(ExpansionLevel*3)))) {
        DecrementSupply(TotalPopulationBoomCost);
        SelectAndAddRandomNeededTribal();
        $('#SupplyUpgrades').attr('class','HiddenSupplyUpgradeBox');
        CurrentPopulationBoomThisTurn++
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Boost_Inspiration').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalInspirationSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Inspiration");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> gain for one era. Limited to one surplus per type per era.");
});
$('#Boost_Inspiration').click(function(){P_Boost_Inspiration();});
function P_Boost_Inspiration(){
    if (CurrentSupply >= TotalInspirationSurplusCost && (InspirationSurplus == false)) {
        DecrementSupply(TotalInspirationSurplusCost);
        InspirationSurplus = true
        $('#SupplyUpgrades').attr('class','HiddenSupplyUpgradeBox');
        RefreshPage();
    }
    else{CannotBeDone();}
}

$('#Boost_Domain').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalDomainSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Domain");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: rgb(207, 166, 0);\">Domain</span> gain for one era. Limited to one surplus per type per era.");
});
$('#Boost_Domain').click(function(){P_Boost_Domain();});
function P_Boost_Domain(){
    if (CurrentSupply >= TotalDomainSurplusCost && (DomainSurplus == false)) {
        DecrementSupply(TotalDomainSurplusCost);
        DomainSurplus = true
        $('#SupplyUpgrades').attr('class','HiddenSupplyUpgradeBox');
        RefreshPage();
    }
    else{CannotBeDone();}
}

$('#Boost_Grip').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalGripSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Grip");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: grey;\">Grip</span> gain for one era. Limited to one surplus per type per era.");
});
$('#Boost_Grip').click(function(){P_Boost_Grip();});
function P_Boost_Grip(){
    if (CurrentSupply >= TotalGripSurplusCost && (GripSurplus == false)) {
        DecrementSupply(TotalGripSurplusCost);
        GripSurplus = true
        $('#SupplyUpgrades').attr('class','HiddenSupplyUpgradeBox');
        RefreshPage();
    }
    else{CannotBeDone();}
}

// Inspiration Upgrade Buttons -----------------------------------------------------------------------

$('#Improve_Hunting_Tools').hover(function(){
    $('#UpgradeInfoBoxCost').html(HunterToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Hunting Tools");
    $('#UpgradeInfoBoxDescription').html("With improved hunting tools, your Tribe can hunt more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Efficiency of your Hunters by 1. \
                                         Your Supply bounty will be the product of your number of Hunters and your Hunting Efficiency.</span>");
});
$('#Improve_Hunting_Tools').click(function(){P_Improve_Hunting_Tools();});
function P_Improve_Hunting_Tools(){
    if (CurrentInspiration >= HunterToolInspirationCost) {
        DecrementInspiration(HunterToolInspirationCost);
        ImprovedToolsLevel++
        HunterMultiplier = HunterMultiplier + 1
        CurrentInfluence = CurrentInfluence + Math.floor(HunterMultiplier * 5)
        $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Improve_Crafting_Tools').hover(function(){
    $('#UpgradeInfoBoxCost').html(CrafterToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Crafting Tools");
    $('#UpgradeInfoBoxDescription').html("With improved crafting tools, your Tribe can craft more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Crafters by 1. \
                                         Your Inspiration bounty will be the product of your number of Crafters and your Crafting Efficiency.</span>");
});
$('#Improve_Crafting_Tools').click(function(){P_Improve_Crafting_Tools();});
function P_Improve_Crafting_Tools(){
    if (CurrentInspiration >= CrafterToolInspirationCost) {
        DecrementInspiration(CrafterToolInspirationCost);
        ImprovedToolsLevel++
        CrafterMultiplier = CrafterMultiplier + 1
        CurrentInfluence = CurrentInfluence + Math.floor(CrafterMultiplier * 5)
        $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Improve_Exploring_Tools').hover(function(){
    $('#UpgradeInfoBoxCost').html(ExplorerToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Exploring Tools");
    $('#UpgradeInfoBoxDescription').html("With improved exploring tools, your Tribe can explore more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Explorers by 1. \
                                         Your Domain bounty will be the product of your number of Explorers and your Exploring Efficiency.</span>");
});
$('#Improve_Exploring_Tools').click(function(){P_Improve_Exploring_Tools();});
function P_Improve_Exploring_Tools(){
    if (CurrentInspiration >= ExplorerToolInspirationCost) {
        DecrementInspiration(ExplorerToolInspirationCost);
        ImprovedToolsLevel++
        ExplorerMultiplier = ExplorerMultiplier + 1
        CurrentInfluence = CurrentInfluence + Math.floor(ExplorerMultiplier * 5)
        $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Improve_War_Tools').hover(function(){
    $('#UpgradeInfoBoxCost').html(WarriorToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve War Tools");
    $('#UpgradeInfoBoxDescription').html("With improved war tools, your Tribe can maintain its grip on the its assets more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Warriors by 1. \
                                         Your Grip bounty will be the product of your number of Warriors and your War Efficiency.</span>");
});
$('#Improve_War_Tools').click(function(){P_Improve_War_Tools();});
function P_Improve_War_Tools(){
    if (CurrentInspiration >= WarriorToolInspirationCost) {
        DecrementInspiration(WarriorToolInspirationCost);    
        ImprovedToolsLevel++
        WarriorMultiplier = WarriorMultiplier + 1
        CurrentInfluence = CurrentInfluence + Math.floor(WarriorMultiplier * 5)
        $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Improve_Culture').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalCultureInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Cultural Innovation");
    $('#UpgradeInfoBoxDescription').html("Advancing in art and sophistication, your tribe begins to leave its mark on the surrounding land and peoples.\
                                         <br/><span class=\"OOC\">This upgrade will increase your culture. Each Era, your culture will be added to your Influence. \
                                         In addition, when Bartering, higher Culture will give larger returns and increase the amount of tension reduced.</span>");
});
$('#Improve_Culture').click(function(){P_Improve_Culture();});
function P_Improve_Culture(){
    if (CurrentInspiration >= TotalCultureInspirationCost) {
        DecrementInspiration(TotalCultureInspirationCost);    
        CultureLevel++
        $('#InspirationUpgrades').attr('class','HiddenInspirationUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}  
}

// Domain Expansion Upgrades----------------------------------------

$('#River_Expansion').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("River Expansion");
    $('#UpgradeInfoBoxDescription').html("River regions provide a great source of food and the wildlife here is exceptionally suitable to raise skilled hunters.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition over time. \
                                         But, it grants capacity for 3 more Hunters</span>");
});
$('#River_Expansion').click(function(){P_River_Expansion();});
function P_River_Expansion(){
    if (CurrentPhase == 99) {
        $('#SettlementText').text("River");
        Settlement = "River";
        HunterExpansionBonus = HunterExpansionBonus + 4
        CrafterExpansionBonus = CrafterExpansionBonus + 1
        ExplorerExpansionBonus = ExplorerExpansionBonus + 2
        WarriorExpansionBonus = WarriorExpansionBonus + 1
        ContinueToIntro2();
    }else if (CurrentDomain >= TotalExpansionDomainCost || CurrentPhase == 99) {
        DecrementDomain(TotalExpansionDomainCost);    
        NumberOfRiverExpansions++
        HunterExpansionBonus = HunterExpansionBonus + 3
        $('#DomainUpgrades').attr('class','HiddenDomainUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Forest_Expansion').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Forest Expansion");
    $('#UpgradeInfoBoxDescription').html("Forest regions provide a great source of wonder and materials for craft. Forests feed the creative mind.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition over time. \
                                         But, it grants capacity for 3 more Crafters</span>");
});
$('#Forest_Expansion').click(function(){P_Forest_Expansion();});
function P_Forest_Expansion(){
    if (CurrentPhase == 99) {
        $('#SettlementText').text("Forest");
        Settlement = "Forest";
        HunterExpansionBonus = HunterExpansionBonus + 1
        CrafterExpansionBonus = CrafterExpansionBonus + 4
        ExplorerExpansionBonus = ExplorerExpansionBonus + 1
        WarriorExpansionBonus = WarriorExpansionBonus + 2
        ContinueToIntro2();
    }else if (CurrentDomain >= TotalExpansionDomainCost) {
        DecrementDomain(TotalExpansionDomainCost);
        NumberOfForestExpansions++
        CrafterExpansionBonus = CrafterExpansionBonus + 3
        $('#DomainUpgrades').attr('class','HiddenDomainUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Savanna_Expansion').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Savanna Expansion");
    $('#UpgradeInfoBoxDescription').html("Savannas are a great portal to new horizons that encourage skilled exploration.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition over time. \
                                         But, it grants capacity for 3 more Explorers</span>");
});
$('#Savanna_Expansion').click(function(){P_Savanna_Expansion();});
function P_Savanna_Expansion(){
    if (CurrentPhase == 99) {
        $('#SettlementText').text("Savanna");
        Settlement = "Savanna";
        HunterExpansionBonus = HunterExpansionBonus + 2
        CrafterExpansionBonus = CrafterExpansionBonus + 1
        ExplorerExpansionBonus = ExplorerExpansionBonus + 4
        WarriorExpansionBonus = WarriorExpansionBonus + 1
        ContinueToIntro2();
    }else if (CurrentDomain >= TotalExpansionDomainCost) {
        DecrementDomain(TotalExpansionDomainCost);    
        NumberOfSavannaExpansions++
        ExplorerExpansionBonus = ExplorerExpansionBonus + 3
        $('#DomainUpgrades').attr('class','HiddenDomainUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

$('#Hill_Expansion').hover(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Hill Expansion");
    $('#UpgradeInfoBoxDescription').html("Hill regions are the most easily defensable and encourage the growth of sturdy warriors.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition over time. \
                                         But, it grants capacity for 3 more Warriors</span>");
});
$('#Hill_Expansion').click(function(){P_Hill_Expansion();});

function P_Hill_Expansion(){
    if (CurrentPhase == 99) {
        $('#SettlementText').text("Hill");
        Settlement = "Hill";
        HunterExpansionBonus = HunterExpansionBonus + 1
        CrafterExpansionBonus = CrafterExpansionBonus + 2
        ExplorerExpansionBonus = ExplorerExpansionBonus + 1
        WarriorExpansionBonus = WarriorExpansionBonus + 4
        ContinueToIntro2();
    }else if (CurrentDomain >= TotalExpansionDomainCost) {
        DecrementDomain(TotalExpansionDomainCost);    
        NumberOfHillExpansions++
        WarriorExpansionBonus = WarriorExpansionBonus + 3
        $('#DomainUpgrades').attr('class','HiddenDomainUpgradeBox');
        RefreshPage();
    }else{CannotBeDone();}
}

//----------------------------

function ContinueToIntro2() {
    $('#IntroDiv').hide();
    $('#DetailsBox').fadeIn(1500);
    $('.SquarePanel').show();
    CurrentSupply = 5;
    CurrentDomain = 5;
    CurrentInspiration = 5;
    CurrentGrip = 5;
    CurrentPhase = 2;
    RefreshPage();
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("New World")    
    $('#EventNar').html("With your new settlement, you can begin to establish your presence here. Spend your resources wisely and make this place your own.");
    EventLoadedValue = 997;
    $('#EventOption1Button').show();
}


// Beginning of Game Intro Logic -------------------------------------------------------------------

$('#River_Expansion_Intro').mouseenter(function(){
    $('#UpgradeInfoBoxDescription').html("This river provides a great source of food and will serve as a good portal to new territory.");
});
$('#River_Expansion_Intro').mouseleave(function(){ClearUpgradeInfoBox();});
$('#River_Expansion_Intro').click(function(){P_River_Expansion();});

$('#Forest_Expansion_Intro').mouseenter(function(){
    $('#UpgradeInfoBoxDescription').html("This patch of forest provides a great source of wonder and is difficult to encroach upon.");
});
$('#Forest_Expansion_Intro').mouseleave(function(){ClearUpgradeInfoBox();});
$('#Forest_Expansion_Intro').click(function(){P_Forest_Expansion();});

$('#Savanna_Expansion_Intro').mouseenter(function(){
    $('#UpgradeInfoBoxDescription').html("This savanna is a great portal to new horizons and hosts a good deal of wildlife.");
});
$('#Savanna_Expansion_Intro').mouseleave(function(){ClearUpgradeInfoBox();});
$('#Savanna_Expansion_Intro').click(function(){P_Savanna_Expansion();});

$('#Hill_Expansion_Intro').mouseenter(function(){
    $('#UpgradeInfoBoxDescription').html("This hill is the most easily defensible territory and will provide great resources for craft.");
});
$('#Hill_Expansion_Intro').mouseleave(function(){ClearUpgradeInfoBox();});
$('#Hill_Expansion_Intro').click(function(){P_Hill_Expansion();});


// Competition Logic ------------------------------------------------------------------------------------

$('#ActionContinueButton').click(ContinueToBegin); 
function ContinueToBegin() {
    CurrentPhase = 0;
    if (VictoryOrLossAchieved) {CurrentPhase = 5}
    RefreshPage();
};

$('#ShiningScalesRaid').hover(function(){
    $('#UpgradeInfoBoxCost').html(RaidingCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Raid the Shining Scales</span>");
    $('#UpgradeInfoBoxDescription').html("Send a raiding party to aquire resources from their territory. This will increase the tension between your tribes, but slow their progress toward victory.");
});
$('#ShiningScalesRaid').click(function(){P_RaidShiningScales();});
function P_RaidShiningScales() {
    if (CurrentGrip >= RaidingCost && CurrentNumberOfWarriors > 0 && Agenda != 2) {
        CurrentPhase = 4;        
        var WarriorsLost = CalculateWarriorsLost(CurrentNumberOfWarriors*3);
        
        ShiningScalesTension = ShiningScalesTension + 10
        ShiningScalesVictoryLevel = ShiningScalesVictoryLevel - Math.floor(CurrentNumberOfWarriors/2);
        if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0};
        DecrementGrip(RaidingCost);
        var WarriorEffectiveness = CurrentNumberOfWarriors    
        if (ImprovedRaidTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)}
        if (Agenda == 1) {WarriorEffectiveness = Math.floor(WarriorEffectiveness + WarRation)}

        var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1));
        var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1));
        var GainedInspiration = Math.floor(WarriorEffectiveness/2);
           
        $('#RaidBarterResult').html("<span class=\"LargerText\" style=\"color: DarkGoldenRod;\">Raiding the Shining Scales</span>\
                                    <br/>Your warriors return from raiding the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> with the following: \
                                    <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                    <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                    <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                    <br/>" + WarriorsLost + "<br/>This raid will slow their progress, but the tension between your tribes increases.");
        
        IncrementSupply(GainedSupply);
        IncrementInspiration(GainedInspiration);
        IncrementDomain(GainedDomain);
        CurrentSupremacy = CurrentSupremacy + (WarriorEffectiveness);
        
        CurrentRaidBarterThisTurn++;
        $('#GripUpgrades').attr('class','HiddenGripUpgradeBox');
        RefreshPage();
    }else{CannotBeDone()};
};

$('#ShiningScalesBarter').hover(function(){
    $('#UpgradeInfoBoxCost').html(BarteringCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Barter with the Shining Scales</span>");
    $('#UpgradeInfoBoxDescription').html("Send an entourage of warriors, traders, and diplomats to barter with them. This will decrease tension between your tribes and put you both closer to victory.");
});
$('#ShiningScalesBarter').click(function(){P_BarterShiningScales();});
function P_BarterShiningScales() {
    if (CurrentGrip >= BarteringCost && CurrentNumberOfWarriors > 0 && Agenda != 1) {
        CurrentPhase = 4;
        ShiningScalesTension = ShiningScalesTension - CultureLevel;
        ShiningScalesVictoryLevel++
        ShiningScalesVictoryLevel++
        if (ShiningScalesTension < 0) {ShiningScalesTension = 0};
        DecrementGrip(BarteringCost);

        var GainedSupply = Math.floor((CultureLevel) * ((Math.random() * 2) + 1));
        var GainedDomain = Math.floor((CultureLevel) * ((Math.random() * 3) + 1));
        var GainedInspiration = Math.floor(CultureLevel);
                
        $('#RaidBarterResult').html("<span class=\"LargerText\" style=\"color: DarkGoldenRod;\">Barter with the Shining Scales</span>\
                                    <br/>Your diplomats return with some gains after a season of bartering with the <span style=\"color: DarkGoldenRod;\">Shining Scales</span>: \
                                    <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                    <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                    <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                    <br/>Relations have improved between your tribes as you both progress toward your goals through cooperation.");
        
        IncrementSupply(GainedSupply);
        IncrementInspiration(GainedInspiration);
        IncrementDomain(GainedDomain);
        CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
        
        CurrentRaidBarterThisTurn++;
        $('#GripUpgrades').attr('class','HiddenGripUpgradeBox');
        RefreshPage();
    }else{CannotBeDone()};
};

$('#LongTalonTribeRaid').hover(function(){
    $('#UpgradeInfoBoxCost').html(RaidingCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: OrangeRed;\">Raid the Long Talon Tribe</span>");
    $('#UpgradeInfoBoxDescription').html("Send a raiding party to aquire resources from their territory. This will increase the tension between your tribes, but slow their progress toward victory."); 
});
$('#LongTalonTribeRaid').click(function(){P_RaidLongTalonTribe();});
function P_RaidLongTalonTribe() {
    if (CurrentGrip >= RaidingCost && CurrentNumberOfWarriors > 0 && Agenda != 2) {
        CurrentPhase = 4;    
        var WarriorsLost = CalculateWarriorsLost(CurrentNumberOfWarriors*3);
        
        LongTalonTribeTension = LongTalonTribeTension + 10
        LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - Math.floor(CurrentNumberOfWarriors/2);
        if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0};
        DecrementGrip(RaidingCost);
        
        var WarriorEffectiveness = CurrentNumberOfWarriors;
        if (ImprovedRaidTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)};
        if (Agenda == 1) {WarriorEffectiveness = Math.floor(WarriorEffectiveness + WarRation)}
        var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1));
        var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1));
        var GainedInspiration = Math.floor(WarriorEffectiveness/2);
        
        $('#RaidBarterResult').html("<span class=\"LargerText\" style=\"color: OrangeRed;\">Raid the Long Talon Tribe</span>\
                                    <br/>Your warriors return from raiding the Long Talon Tribe with the following: \
                                    <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                    <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                    <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                    <br/>" + WarriorsLost + "<br/>This raid will slow their progress, but the tension between your tribes increases.");
        
        IncrementSupply(GainedSupply);
        IncrementInspiration(GainedInspiration);
        IncrementDomain(GainedDomain);
        CurrentSupremacy = CurrentSupremacy + (CurrentNumberOfWarriors);
        
        CurrentRaidBarterThisTurn++;
        $('#GripUpgrades').attr('class','HiddenGripUpgradeBox');
        RefreshPage();
    }else{CannotBeDone()};
}


$('#LongTalonTribeBarter').hover(function(){
    $('#UpgradeInfoBoxCost').html(BarteringCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: OrangeRed;\">Barter with the Long Talon Tribe</span>");
    $('#UpgradeInfoBoxDescription').html("Send an entourage of warriors, traders, and diplomats to barter with them. This will decrease tension between your tribes and put you both closer to victory.");

});
$('#LongTalonTribeBarter').click(function(){P_BarterLongTalonTribe();});
function P_BarterLongTalonTribe() {
    if (CurrentGrip >= BarteringCost && CurrentNumberOfWarriors > 0 && Agenda != 1) {    
        CurrentPhase = 4;
        LongTalonTribeTension = LongTalonTribeTension - CultureLevel;
        LongTalonTribeVictoryLevel++
        LongTalonTribeVictoryLevel++
        if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0};
        DecrementGrip(BarteringCost); 
        var GainedSupply = Math.floor((CultureLevel) * ((Math.random() * 3) + 1));
        var GainedDomain = Math.floor((CultureLevel) * ((Math.random() * 2) + 1));
        var GainedInspiration = Math.floor(CultureLevel);
        $('#RaidBarterResult').html("<span class=\"LargerText\" style=\"color: OrangeRed;\">Barter with the Long Talon Tribe</span>\
                                    <br/>Your diplomats return with some gains after a season of bartering with the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>: \
                                    <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                    <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                    <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                    <br/>Relations have improved between your tribes as you both progress toward your goals through cooperation.");
        
        IncrementSupply(GainedSupply);
        IncrementInspiration(GainedInspiration);
        IncrementDomain(GainedDomain);
        CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
        
        CurrentRaidBarterThisTurn++;
        $('#GripUpgrades').attr('class','HiddenGripUpgradeBox');
        RefreshPage();
    }else{CannotBeDone()};
}

// Events Logic --------------------------------------------------------------------------------------

function CalculateEvent() {
    RefreshEvent();
    var NeedToFindEvent = true;
    
    //timed events
    if (CurrentEra == 1) {
        LongTalonArrivalEra = LongTalonArrivalEra + Math.floor((Math.random()*4)+1);
        ShiningScalesIntroduction();
        NeedToFindEvent = false;
    }    
    if (CurrentEra >= LongTalonArrivalEra && !LongTalonTribePresent) {
        LongTalonTribeIntroduction();
        NeedToFindEvent = false;
    }
    
    //Raids
    var HostilityCounter = 0;
    while (HostilityCounter < CurrentRaidBarterThisTurn && NeedToFindEvent) {
        HostilityCounter++
        var RandomRaid = Math.floor((Math.random() * 2) + 1);
        switch (RandomRaid) {
            case 1:
                var D_HalfTensionCap = Math.floor((Math.random() * (TensionCap/2)) + 1);
                D_HalfTensionCap = D_HalfTensionCap + LongTalonTribeTension
                if (D_HalfTensionCap > TensionCap && LongTalonTribePresent) {
                    if (WaywardKindLongTalon) {
                        LongTalonRaidKind();
                        NeedToFindEvent= false;
                    }else{
                        CalculateLongTalonTribeRaided();
                        NeedToFindEvent= false;
                    }
                }                          
                break;
            case 2:
                var D_HalfTensionCap = Math.floor((Math.random() * (TensionCap/2)) + 1);
                D_HalfTensionCap = D_HalfTensionCap + ShiningScalesTension
                if (D_HalfTensionCap > TensionCap && ShiningScalesPresent) {
                    if (WaywardKindShiningScales) {
                        ShiningScalesRaidKind();
                        NeedToFindEvent= false;
                    }else{
                        CalculateShiningScalesRaided();
                        NeedToFindEvent= false;
                    }
                }                          
                break;
        }
    }
    
    //Council Of Elders event
    if (NeedToFindEvent && Agenda == 0) {
        var CouncilRandom = Math.floor((Math.random() * 10) + 1);
        if (CouncilRandom > 5) {
            E_CouncilOfElders();
            NeedToFindEvent= false;
        }
    }
    
    //Random Events    
    var attempts = 0;
    while (attempts < (ExpansionLevel+1) && NeedToFindEvent) {
        attempts++
        var CategoryRandom = Math.floor((Math.random() * 4) + 1);
        if (CategoryRandom == 1) // Expansion Event
        {
            var EnvironmentEvent = Math.floor((Math.random() * 4) + 1);
            switch (EnvironmentEvent) {
            case 1:
                var RandomRiver = Math.floor((Math.random() * 2) + 1);
                switch (RandomRiver) {
                case 1:
                    if (NumberOfRiverExpansions > 0 || Settlement == "River" && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        D10 = D10 + Math.floor(NumberOfRiverExpansions / 2)
                        if (Settlement == "River") {D10 = D10+2};
                        if (D10 > 4) {
                            E_HostileWildlife();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                case 2:
                    if (NumberOfRiverExpansions > 0 || Settlement == "River" && NeedToFindEvent && CurrentDomain + CurrentSupply > 0) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        D10 = D10 + Math.floor(NumberOfRiverExpansions / 2)
                        if (Settlement == "River") {D10 = D10+2};
                        if (D10 > 4) {
                            E_RisingWaters();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                }
                break;
            case 2:                
                if (NumberOfSavannaExpansions > 0 || Settlement == "Savanna" && NeedToFindEvent) {
                    var RandomSavanna = Math.floor((Math.random() * 2) + 1);
                    switch (RandomSavanna) {
                        case 1:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfSavannaExpansions / 2)
                            if (Settlement == "Savanna") {D10 = D10+2};
                            if (D10 > 4) {
                               E_WildStorms();
                               NeedToFindEvent= false;
                            }                          
                            break;
                        case 2:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfSavannaExpansions / 2)
                            if (Settlement == "Savanna") {D10 = D10+2};
                            if (D10 > 4) {
                                E_FavorableConditions();
                                NeedToFindEvent= false;
                            }                          
                            break;           
                    }
                }
                break;
            case 3:
                if (NumberOfForestExpansions > 0 || Settlement == "Forest" && NeedToFindEvent) {
                    var RandomForest = Math.floor((Math.random() * 2) + 1);
                    switch (RandomForest) {
                        case 1:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfForestExpansions / 2)
                            if (Settlement == "Forest") {D10 = D10+2};
                            if (D10 > 4) {
                                E_BrushFire();
                                NeedToFindEvent= false;
                            }
                            break;
                        case 2:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfForestExpansions / 2)
                            if (Settlement == "Forest") {D10 = D10+2};
                            if (D10 > 4 && CurrentNumberOfCrafters > 0) {
                                E_Visions();
                                NeedToFindEvent= false;
                            }
                            break;
                    }
                }
                break;
            case 4:
                if (NumberOfHillExpansions > 0 || Settlement == "Hill" && CurrentNumberOfExplorers > 0 && NeedToFindEvent) {
                    var D10 = Math.floor((Math.random() * 10) + 1);
                    D10 = D10 + Math.floor(NumberOfHillExpansions / 2)
                    if (Settlement == "Hill") {D10 = D10+2};
                    if (D10 > 4) {
                        E_Caverns();
                        NeedToFindEvent= false;
                    }
                }
                break;
            }
        }else if (CategoryRandom == 2) // Competition Event
        {
            var RelationsEvent = Math.floor((Math.random() * 4) + 1);    
            switch (RelationsEvent) {
                case 1:
                    if (CurrentSupply > 2 && CurrentInspiration > 2 && CurrentDomain > 2 && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_DemandTribute();
                            NeedToFindEvent= false;
                        }
                    }            
                    break;
                case 2:
                    if (NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_ProposedTrade();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                case 3:
                    if (CurrentSupply > 4 && NeedToFindEvent && (!WaywardAndDesperateExperienced)) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 5) {
                            E_WaywardAndDesperate();
                            NeedToFindEvent= false;
                        }                   
                    }
                    break;
                case 4:
                    if(NeedToFindEvent && Agenda < 2 && LongTalonTribePresent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_Alliance();
                            NeedToFindEvent= false;
                        }  
                    }
                    break;
            }
        }else if (CategoryRandom == 3 || CategoryRandom == 4) // Uncategorized Event
        {
            var UncategorizedEvent = Math.floor((Math.random() * 4) + 1);
            switch (UncategorizedEvent) {
                case 1:
                    if (CurrentDomain >= (TotalDiscoveryDomainCost) && !(CurrentDiscovery == 5) && NeedToFindEvent) {
                        E_Discover();
                        NeedToFindEvent= false; 
                    }else{E_DiscoverNotEnough(); NeedToFindEvent= false;}
                    break;
                case 2:
                    if (CurrentPopulation > 1 && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 7) {
                            E_Illness();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                case 3:
                    if (NeedToFindEvent && !Pottery || !Totems || !ImprovedRaidTactics) {
                        if (CurrentInspiration >= TotalInventionInspirationCost) {
                            E_Invention();
                            NeedToFindEvent= false;
                       }else{E_InventionNotEnough(); NeedToFindEvent= false;}
                    }
                   break;
                case 4:
                    if (NeedToFindEvent) {
                        if (CurrentSupply >= FestivalCost) {
                            E_Festival();
                            NeedToFindEvent= false;
                        }else{E_FestivalNotEnough(); NeedToFindEvent= false;}
                    }                    
                    break;
            }
        }
            
    }
    
    if(NeedToFindEvent) {ShowEventEnd();}    
}

$('#EventOption1Button').click(function(){  
   
   switch (EventLoadedValue) {
    case 101:
        EC_ClaimDiscovery();
        break;
    case 102:
        EC_Pottery_InventPottery();
        break;
    case 111:
        EC_Festival_ThrowFestival();
        break;
    case 201:
        EC_Illness_Quarantine();
        break;
    case 202:
        EC_RisingWaters_Evacuate();
        break;
    case 203:
        EC_HostileWildlife_HuntingParty();
        break;
    case 204:
        EC_BrushFire_Evacuate();
        break;
    case 205:
        EC_Caverns_Explore();
        break;
    case 206:
        EC_Visions_Take();
        break;
    case 301:
        EC_DemandTribute_GiveTribute();
        break;
    case 302:
        EC_ProposedTrade_Accept();
        break;
    case 303:

        break;
    case 304:
        EC_WaywardAndDesperate_Aid();
        break;
    case 305:
        EC_Alliance_AssistLongTalonTribe();
        break;
    case 306:
        EC_CouncilOfElders_PathOfWar();
        break;
    case 401:
        CalculateLongTalonTribeRaided_DefendResources();
        break;
    case 402:
        CalculateShiningScalesRaided_DefendResources();
        break;
    case 997:
        ContinueToBegin();
        break;
    case 998:
        CalculateEvent();
        break;
    case 999:
        ShowEventEnd();
        break;
    case 1000:
        CurrentPhase = 0;
        CurrentEra++
        RefreshPage();
        break;
    default:
        alert("Ya done broke it.  EventOption1")
   }
});

$('#EventOption2Button').click(function(){  
   
   switch (EventLoadedValue) {
    case 101:
        ShowEventEnd();
        break;
    case 102:
        EC_ImprovedRaidTactics_InventImprovedRaidTactics();
        break;
    case 111:
        ShowEventEnd();
        break;
    case 201:
        EC_Illness_Treat();
        break;
    case 202:
        EC_RisingWaters_Fortify();
        break;
    case 203:
        EC_HostileWildlife_Outwit();
        break;
    case 204:
        EC_BrushFire_Protect();
        break;
    case 205:
        ShowEventEnd();
        break;
    case 206:
        EC_Visions_Ignore();
        break;
    case 301:
        EC_DemandTribute_DenyTribute();
        break;
    case 302:
        EC_ProposedTrade_Deny();
        break;
    case 303:

        break;
    case 304:
        ShowEventEnd();
        break;
    case 305:
        EC_Alliance_AssistShiningScales();
        break;
    case 306:
        EC_CouncilOfElders_PathOfPeace();
        break;
    case 401:
        CalculateLongTalonTribeRaided_DefendInterests();
        break;
    case 402:
        CalculateShiningScalesRaided_DefendInterests();
        break;
    default:
        alert("Ya done broke it.  EventOption2")
   }
});

$('#EventOption3Button').click(function(){  
   
   switch (EventLoadedValue) {
    case 101:
        ShowEventEnd()
        break;
    case 102:
        EC_Totems_InventTotems();
        break;
    case 203:
        EC_HostileWildlife_Migrate();
        break;
    case 204:
        EC_BrushFire_StandYourGround();
        break;
    case 305:
        EC_Alliance_TurnAway();
        break;
    case 306:
        EC_CouncilOfElders_PathOfSeclusion();
        break;
    case 401:
        CalculateLongTalonTribeRaided_FullDefense();
        break;
    case 402:
        CalculateShiningScalesRaided_FullDefense();
        break;
    default:
        alert("Ya done broke it.  EventOption3")
   }
});

$('#EventOption4Button').click(function(){  
   
   switch (EventLoadedValue) {
    case 102:
        ShowEventEnd();       
        break;
    case 203:
        EC_HostileWildlife_StandYourGround();
        break;
    case 306:
        EC_CouncilOfElders_MiddlePath()
        break;
    case 401:
        CalculateLongTalonTribeRaided_Undefended()
        break;
    case 402:
        CalculateShiningScalesRaided_Undefended()
        break;
    default:
        alert("Ya done broke it.  EventOption4")
   }
});

function RefreshEvent() {
    $('#EventResultBoxHeader').html("");
    $('#EventNar').html("");
    $('#EventOption1Description').html("");
    $('#EventOption1Button').hide();
    $('#EventOption2Description').html("");
    $('#EventOption2Button').hide();
    $('#EventOption3Description').html("");   
    $('#EventOption3Button').hide();
    $('#EventOption4Description').html("");   
    $('#EventOption4Button').hide();
}

function NonEvent() {
    $('#EventNar').html("There was a calm time of growth and reflection.");
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}
//Illness ---------------------------

function ShiningScalesIntroduction() {
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>")
    $('#EventNar').html("A stranger approaches your settlement. He is adorned with scales that shine the color of the sun. The old warrior of your tribe steps forward to confront the traveller, waving the rest of the tribe back.\
                        <br/><br/>After much deliberation, the stranger leaves and you are told of what transpired. His people will be of no threat to us for now. Though we should remain vigilant.\
                        <br/><br/>You can now Barter with and Raid the <span style=\"color: DarkGoldenRod;\">Shining Scales</span>.  Their tension score will show the dormant hostility with us. With tensions too high, we can expect aggressive action. \
                        Be mindful also that they are not left unchecked as to grow too powerful and claim this land as their own.");
    $('#EventOption1Button').show();    

    ShiningScalesPresent = true;
    $('#ShiningScalesDetails').fadeIn();
    $('#ShiningScalesUpgrades').css('class','ShownShiningScalesUpgradeBox');
    EventLoadedValue = 999;
    RefreshPage();
}

function LongTalonTribeIntroduction() {
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">The Long Talon Tribe</span>")
    $('#EventNar').html("You are awakened with the morning mist by the cries of rage and anguish of your kin. \
                         You come to find that not but moments ago your settlement was raided! Luckily, nothing of great value was lost in the raid. Further still, one of the raiders was killed. \
                         The slain assailant has skin colored with red dyes. Around their neck hangs the long talon of a bird of prey. \
                        <br/><br/>You can now Barter with and Raid the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>. The motives of these newcomers is not yet known, \
                        though it appears they are quite hostile. Still, perhaps peace can yet be attained through cooperation.");
    $('#EventOption1Button').show();    
    LongTalonTribeTension = CurrentEra;
    LongTalonTribePresent = true;
    $('#LongTalonTribeDetails').fadeIn();
    $('#LongTalonUpgrades').css('class','ShownLongTalonUpgradeBox');
    EventLoadedValue = 999;
    RefreshPage();    
}

function E_Illness() {
    var TribalNotYetFound = true;
    while (TribalNotYetFound) {
        SelectSelectedRandomTribal();
        switch (SelectedRandomTribalValue) {
            case 1:
                if (CurrentNumberOfHunters > 0) {
                    CurrentNumberOfHunters--
                    TribalNotYetFound = false;
                }
                break;
            case 2:
                if (CurrentNumberOfExplorers > 0) {
                    CurrentNumberOfExplorers--
                    TribalNotYetFound = false;
                }
                break;
            case 3:
                if (CurrentNumberOfCrafters > 0) {
                    CurrentNumberOfCrafters--
                    TribalNotYetFound = false;
                }
                break;
            case 4:
                if (CurrentNumberOfWarriors > 0) {
                    CurrentNumberOfWarriors--
                    TribalNotYetFound = false;
                }               
                break;
        }
    }

    var SupplyCost = (CurrentPopulation - 1);
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Illness")
    $('#EventNar').html("An illness sweeps over your tribe. One of your " + SelectedRandomTribal + "s has already died.");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Quarantine<br/>Risk no further tribe members or resources by seperating the sick from the healthy. There is some chance you will lose more.");
    $('#EventOption1Button').show();
    if (CurrentSupply >= SupplyCost) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Treat<br/> Spend " + SupplyCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> to treat your sick and prevent further losses.");
        $('#EventOption2Button').show();
    }
    EventLoadedValue = 201;
}

function EC_Illness_Quarantine() {
    var TribalNotYetFound = true;
    while (TribalNotYetFound) {
        SelectSelectedRandomTribal();
        switch (SelectedRandomTribalValue) {
            case 1:
                if (CurrentNumberOfHunters > 0) {
                    CurrentNumberOfHunters--
                    TribalNotYetFound = false;
                }
                break;
            case 2:
                if (CurrentNumberOfExplorers > 0) {
                    CurrentNumberOfExplorers--
                    TribalNotYetFound = false;
                }
                break;
            case 3:
                if (CurrentNumberOfCrafters > 0) {
                    CurrentNumberOfCrafters--
                    TribalNotYetFound = false;
                }
                break;
            case 4:
                if (CurrentNumberOfWarriors > 0) {
                    CurrentNumberOfWarriors--
                    TribalNotYetFound = false;
                }               
                break;
        }
    }
    RefreshPage();
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Illness")    
    $('#EventNar').html("One of our " + SelectedRandomTribal + " has died. The illness seems to have fully passed from us.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_Illness_Treat() {
    DecrementSupply(CurrentPopulation);
    RefreshEvent();
    RefreshPage();    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Illness")    
    $('#EventNar').html("The effort has paid off. No further Tribe Members have died and the illness passes");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

//Rising Waters------------------------------
function E_RisingWaters() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Rising Waters")
    $('#EventNar').html("Water lines begin to rise and your tribe is at risk of losing domain and supplies.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Evacuate<br/>Abandon some of your <span style=\"color: rgb(207, 166, 0);\">Domain</span> and <span style=\"color: rgb(178, 0, 0);\">Supply</span> to the water, but lose no time.");
    $('#EventOption1Button').show();

    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Fortify<br/>Spend time to fortify and redirect.");
    $('#EventOption2Button').show();
  
    EventLoadedValue = 202;
}

function EC_RisingWaters_Evacuate() {
    DomainLost = 0;
    SupplyLost = 0;
    if (CurrentDomain>0) {DomainLost = Math.max(Math.floor(CurrentDomain/2),1);
    DecrementDomain(DomainLost);}
    if (CurrentSupply>0) {SupplyLost = Math.max(Math.floor(CurrentSupply/2),1);
    DecrementSupply(SupplyLost);}
    
    RefreshPage();
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Rising Waters")
    if (DomainLost > 0 && SupplyLost > 0) {
        $('#EventNar').html("Your tribe evacuates the riverlands for a time, abandoning "+DomainLost+" <span style=\"color: rgb(207, 166, 0);\">Domain</span> and "+SupplyLost+" <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
    }else if (DomainLost > 0) {
        $('#EventNar').html("Your tribe evacuates the riverlands for a time, abandoning "+DomainLost+" <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
    }else{
        $('#EventNar').html("Your tribe evacuates the riverlands for a time, abandoning "+SupplyLost+" <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
    }    
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_RisingWaters_Fortify() {
    PassXEras(1);
    RefreshPage();
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Rising Waters")
    $('#EventNar').html("Your tribe takes the time to fortify as well as redirect the flow of the rising waters. Your opponents still progress during this effort.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Hostile Wildlife-------------------------------------

function E_HostileWildlife() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Hostile Wildlife")
    $('#EventNar').html("Terrifying clawed beasts are roving around the river near your tribe, hoping to make an easy meal of the fauna that gather there.");
    if (CurrentNumberOfHunters > 0) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Hunting Party<br/>Risk losing hunters to gain extra <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
        $('#EventOption1Button').show();
    }
    if (CurrentInspiration > 9) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Outwit<br/>Spend 10 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to end the threat.");
        $('#EventOption2Button').show();
    }
    if (CurrentDomain > 9) {
        $('#EventOption3Description').show();
        $('#EventOption3Description').html("Migrate<br/>Lose 10 <span style=\"color: rgb(207, 166, 0);\">Domain</span> to end the threat.");
        $('#EventOption3Button').show();
    }
        $('#EventOption4Description').show();
        $('#EventOption4Description').html("Stand your ground<br/>Risk the loss of tribe members to stay your ground.");
        $('#EventOption4Button').show();
        
    EventLoadedValue = 203;
}

function EC_HostileWildlife_HuntingParty() {
    var HuntersLost = Math.floor(((Math.random() * CurrentNumberOfHunters) + 1)) - (HunterMultiplier);
    var ResultText = "";
    if (HuntersLost <= 0) {
        HuntersLost = 0;
        ResultText = "Your hunters return with no loses!"
    }else if (HuntersLost == 1){
        ResultText = "The hunt proves tragic. " + HuntersLost + " of your Hunters has been killed."
    }else{
        ResultText = "The hunt proves tragic. " + HuntersLost + " Hunters of your Hunting party have been killed."
    }
    CurrentNumberOfHunters = CurrentNumberOfHunters - HuntersLost;
    var Bounty = CurrentNumberOfHunters * 4
    IncrementSupply(Bounty);
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Hostile Wildlife")    
    $('#EventNar').html(ResultText + "<br/> The bounty is " + Bounty + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_HostileWildlife_Outwit() {
    DecrementInspiration(10);
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Hostile Wildlife")    
    $('#EventNar').html("The beasts have been led from your domain by traps and the clever use of scent and effigies");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_HostileWildlife_Migrate() {
    DecrementDomain(10);
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Hostile Wildlife")    
    $('#EventNar').html("Your tribe has vacated the territory for now. Perhaps you will return once the beasts decide to move on.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_HostileWildlife_StandYourGround() {
    var HostileRandom = (Math.floor((Math.random() * CurrentPopulation) + 1))
    var losses = "Luckily, no tribe members were";
    HostileRandom = Math.floor(CurrentPopulation/2)
    if (HostileRandom<3) {
        //no losses
    }else if (HostileRandom<5) {
        SelectAndRemoveSelectedRandomTribal();
        losses = ("One of our " +SelectedRandomTribal+"s were");
    }else if (HostileRandom<7) {
        SelectAndRemoveSelectedRandomTribal();
        SelectAndRemoveSelectedRandomTribal();
        losses = ("Two of our Tribe Members were");
    }else{
        SelectAndRemoveSelectedRandomTribal();
        SelectAndRemoveSelectedRandomTribal();
        SelectAndRemoveSelectedRandomTribal();
        losses = ("Sadly, several Tribe Members were");
    }   
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Hostile Wildlife")    
    $('#EventNar').html(losses+" lost before the beasts decided to move on.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Visions ------------------------------------

function E_Visions() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Visions")
    $('#EventNar').html("A tribe member has happened upon flora along the trees that, according to the elders, may inspire great insight should the mind endure.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Take:<br/>Allow the crafter to ingest the sacred growth.");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore:<br/>The risks are too great. Leave it.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 206;
}

function EC_Visions_Take() {
        RefreshEvent();
    var VisionsRandom = (Math.floor((Math.random() * 2) + 1))
    if (VisionsRandom == 1) {
        CurrentNumberOfCrafters--
        RefreshPage();  
        $('#EventResultBoxHeader').show()
        $('#EventResultBoxHeader').html("Visions")    
        $('#EventNar').html("Your crafter returns from the ordeal, though only in part. This crafter now resides beyond sanity.");        
    }else{
        IncrementInspiration(20);
        RefreshPage();  
        $('#EventResultBoxHeader').show()
        $('#EventResultBoxHeader').html("Visions")    
        $('#EventNar').html("Your crafter endures and finds great insight in the ordeal. Your tribe gains 20 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>.");
    }

    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_Visions_Ignore() {
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Visions")    
    $('#EventNar').html("Wisdom prevails and the flora is left to its place.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}
// Brush Fire -----------------------------------

function E_BrushFire() {    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")
    $('#EventNar').html("A brush fire has errupted nearby and is enchroaching on your domain.");

    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Evacuate<br/>lose some time to vacate and resettle nearby.");
    $('#EventOption1Button').show();

    if (CurrentInspiration > 9) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Protect<br/>Spend 10 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to protect your domain through enginuity.");
        $('#EventOption2Button').show();
    }
    $('#EventOption3Description').show();
    $('#EventOption3Description').html("Stand Your Ground<br/>Risk the loss of your tribe members to stand your ground.");
    $('#EventOption3Button').show();
    
    EventLoadedValue = 204;
}

function EC_BrushFire_Evacuate() {
    PassXEras(1);
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")    
    $('#EventNar').html("Your tribe has vacated the territory and resettled safely out of reach of the flames and their wake. An Era has passed.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_BrushFire_Protect() {
    DecrementInspiration(10);
    BrushFireInnovation = true;
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")    
    $('#EventNar').html("Your tribe has formed a ring of scorched earth around your domain and stopped the wildfire's growth in your direction. This will prevent future brush fires.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_BrushFire_StandYourGround() {
    
    var TribalNotYetFound = true;
    while (TribalNotYetFound) {
        SelectSelectedRandomTribal();
        switch (SelectedRandomTribalValue) {
            case 1:
                if (CurrentNumberOfHunters > 0) {
                    CurrentNumberOfHunters--
                    TribalNotYetFound = false;
                }
                break;
            case 2:
                if (CurrentNumberOfExplorers > 0) {
                    CurrentNumberOfExplorers--
                    TribalNotYetFound = false;
                }
                break;
            case 3:
                if (CurrentNumberOfCrafters > 0) {
                    CurrentNumberOfCrafters--
                    TribalNotYetFound = false;
                }
                break;
            case 4:
                if (CurrentNumberOfWarriors > 0) {
                    CurrentNumberOfWarriors--
                    TribalNotYetFound = false;
                }               
                break;
        }
    }
    var SupplyLost = (Math.floor((Math.random() * CurrentSupply) + 1))
    DecrementSupply(SupplyLost);    
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")    
    $('#EventNar').html("One of your " +SelectedRandomTribal+ "s was lost fighting the flames. " +  SupplyLost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was lost.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Caverns ----------------------------------------

function E_Caverns() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Caverns")
    $('#EventNar').html("Your explorers have discovered the entrance to a cave network.");
    
    if (CurrentNumberOfExplorers>0) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Explore<br/>Risk an explorer to settle the cave. This could reward you with some <span style=\"color: grey;\">Grip</span>. Improved exploring tools will increase your chance and payout.");
        $('#EventOption1Button').show();
    }
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore<br/>Carry on. It is not worth the risk to investigate further.");
    $('#EventOption2Button').show();    
    EventLoadedValue = 205;
}

function EC_Caverns_Explore() {
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Caverns")    
    var RiskRandom = Math.floor((Math.random()*(2*ExplorerMultiplier))+1)
    if (RiskRandom< 2) {
        CurrentNumberOfExplorers = CurrentNumberOfExplorers - 1;
        RefreshPage(); 
        $('#EventNar').html("Your explorer does not return.");
        $('#EventOption1Button').show();
    }else{
        var GripEarned = Math.floor(5*ExplorerMultiplier)
        IncrementGrip(GripEarned);
        RefreshPage();  
        $('#EventNar').html("Your explorer has settled and fortified the cave. You've earned "+ GripEarned +  " <span style=\"color: grey;\">Grip</span>");
        $('#EventOption1Button').show();
    }    
    EventLoadedValue = 999;
}

// WIld Storms ----------------------------------------
function E_WildStorms() {    
    var SupplyLost = Math.floor(CurrentSupply / 3);
    DecrementSupply(SupplyLost);
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Wild Storms")
    $('#EventNar').html("The savanna was ravaged by Wild Storms. " + SupplyLost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was lost.");
    
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}

// ----------------------------------------------------

function E_FavorableConditions() {    
    DomainSurplus = true;
    SupplySurplus = true;
    InspirationSurplus = true;
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Favorable Conditions");
    $('#EventNar').html("Favorable conditions in the Savanna will serve as a surplus in boosting your gains next Era.");
    
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}

function E_Festival() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Festival")
    $('#EventNar').html("You have enough <span style=\"color: rgb(178, 0, 0);\">Supply</span> Surplus to host a festival.");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Throw Festival<br/>Spend "+FestivalCost+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> \
                                       to host a Feast. This will decrease Tension between you and your rivals as well increase your Influence and your Supremacy.");
    $('#EventOption1Button').show();
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore<br/>Do not spare resources for such frivolous undertakings.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 111;
}

function E_FestivalNotEnough() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Festival");
    $('#EventNar').html("With "+FestivalCost+" stashed <span style=\"color: rgb(178, 0, 0);\">Supply</span>, you could host a festival.  Festivals provide many boons. The cost and effectiveness of a festival increases with your population.");
    
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}

function EC_Festival_ThrowFestival() {
    DecrementSupply(FestivalCost);
    IncrementInfluence(CurrentPopulation);
    IncrementSupremacy(CurrentPopulation);
    LongTalonTribeTension = LongTalonTribeTension - Math.floor(CurrentPopulation/2);
    ShiningScalesTension = ShiningScalesTension - Math.floor(CurrentPopulation/2);
    if (LongTalonTribeTension < 0 ) {LongTalonTribeTension = 0};
    if (ShiningScalesTension < 0 ) {ShiningScalesTension = 0};
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Festival")    
    $('#EventNar').html("You threw a Festival! \
                        <br/>Tensions have decreased and your Supremacy and Influence has increased by " + CurrentPopulation);
    EventLoadedValue = 999;
    $('#EventOption1Button').show();   
}


// Pottery----------------------------------------

function E_InventionNotEnough(){
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention")
    $('#EventNar').html("With "+TotalInventionInspirationCost+" stashed <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>, your crafters might happen upon suprising innovations. For now, you are deficient in that resource.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
}

function E_Invention() {
        $('#EventResultBoxHeader').show()
        $('#EventResultBoxHeader').html("Invention")
        $('#EventNar').html("Your crafters would like to explore a unique creative pursuit that could greatly benefit the tribe. Which invention would you like to pursue?");
        if (!Pottery) {
            $('#EventOption1Description').show();
            $('#EventOption1Description').html("Invent Pottery<br/>Spend "+TotalInventionInspirationCost+" <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to invent Pottery. This will improve the effectiveness on your Surplus.");
            $('#EventOption1Button').show();
        }
        if (!ImprovedRaidTactics) {
            $('#EventOption2Description').show();
            $('#EventOption2Description').html("Invent Improved Raiding Tactics<br/>Spend "+TotalInventionInspirationCost+" <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to invent Improved Raiding Tactics. This will improve the effectiveness of each Warrior while raiding.");
            $('#EventOption2Button').show();
        }
        if (!Totems) {
            $('#EventOption3Description').show();
            $('#EventOption3Description').html("Invent Totems<br/>Spend "+TotalInventionInspirationCost+" <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to invent Totems. This will increase your Supremacy and Influence per region each era.");
            $('#EventOption3Button').show();
        }

        $('#EventOption4Description').show();
        $('#EventOption4Description').html("Ignore these creative pursuits.");
        $('#EventOption4Button').show();
        
        EventLoadedValue = 102;
}


function EC_Pottery_InventPottery() {
    DecrementInspiration(TotalInventionInspirationCost);
    IncrementInfluence(TotalInventionInspirationCost);
    Pottery = true;
    InventionLevel++;
    $('#Pottery').show();
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention")    
    $('#EventNar').html("Your crafters invent Pottery! \
                        <br/>This will increase the bonus from Surplus. It has also increased your Influence significantly!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Improved War Tactics ----------------------------------------

function EC_ImprovedRaidTactics_InventImprovedRaidTactics() {
    DecrementInspiration(TotalInventionInspirationCost);
    IncrementInfluence(TotalInventionInspirationCost);
    ImprovedRaidTactics = true;
    $('#War_Tactics').show();
    InventionLevel++;
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention")    
    $('#EventNar').html("Your have Invented Improved Raiding Tactics! \
                        <br/>This will improve your effectiveness while raiding. It has also increased your Influence significantly!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

//Totems ------------------------------------------------

function EC_Totems_InventTotems() {
    DecrementInspiration(TotalInventionInspirationCost);
    IncrementInfluence(TotalInventionInspirationCost);
    Totems = true;
    InventionLevel++;
    $('#Totems').show();
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention")    
    $('#EventNar').html("Your crafters invent Totems! \
                        <br/>This will increase your supremacy and influence per region over time. It has also increased your Influence significantly!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Demand Tribute----------------------------------------

function E_DemandTribute() {
    
    SelectRandomRival();
    
    switch (SelectedRandomRivalValue) {
        case 1:
            var DemandedSupply = Math.floor(CurrentSupply / 4);
            $('#EventOption1Description').show();
            $('#EventOption1Description').html("Give Tribute:<br/>Give " + SelectedRandomRival + " "+ DemandedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> \
                                                <br/>This will improve your relations");
            break;
        case 2:
        var DemandedDomain = Math.floor(CurrentDomain / 4);
            $('#EventOption1Description').show();
            $('#EventOption1Description').html("Give Tribute:<br/>Give " + SelectedRandomRival + " "+ DemandedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> \
                                                <br/>This will improve your relations");
            break;
        case 3:
        var DemandedInspiration = Math.floor(CurrentInspiration / 4);
            $('#EventOption1Description').show();
            $('#EventOption1Description').html("Give Tribute:<br/>Give " + SelectedRandomRival + " "+ DemandedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> \
                                                <br/>This will improve your relations");
            break;
    }    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Tribute")
    $('#EventNar').html(SelectedRandomRival + "  demands tribute from you. How do you respond?");
    
    $('#EventOption1Button').show();

    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Deny Tribute:<br/>Lose nothing. This will Increase tension between your tribes, but also increase your Supremacy");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 301;
}

function EC_DemandTribute_GiveTribute() {    

    var DemandedResource = 0;
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension--
            LongTalonTribeTension--
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            LongTalonTribeVictoryLevel++
            DemandedResource = Math.floor(CurrentSupply / 4);
            DecrementSupply(DemandedResource);
            break;
        case 2:
            ShiningScalesTension--
            ShiningScalesTension--
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            ShiningScalesVictoryLevel++
            DemandedResource = Math.floor(CurrentDomain / 4);
            DecrementDomain(DemandedResource);
            break;
    }    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Tribute")    
    $('#EventNar').html("You surrendered your resources to the " + SelectedRandomRival + ". \
                        <br/>This has brought them closer to victory, but decreased tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_DemandTribute_DenyTribute() {
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension++
            LongTalonTribeTension++
            break;
        case 2:
            ShiningScalesTension++
            ShiningScalesTension++
            break;
    }
    CurrentSupremacy = CurrentSupremacy + 10
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Tribute")    
    $('#EventNar').html("You refuse to surrender your resources to " + SelectedRandomRival + ": \
                        <br/>This has brought you respect, increasing supremacy, but increased tension between your tribes as well.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Proposed Trade ---------------------------------------

function E_ProposedTrade() {
    
    SelectRandomRival();
    
    var CombinationNotYetFound = true;
    var Attempts = 0;
    var Quantity = Math.max(CurrentEra,5);   
    while (CombinationNotYetFound && Attempts < 10) {
        Attempts++
        SelectRandomResource();
        SelectSecondRandomResource();
        switch (SelectedRandomResourceValue) {
        case 1:
            if (Quantity <= CurrentSupply) {CombinationNotYetFound = false}
            break;
        case 2:
            if (Quantity <= CurrentDomain) {CombinationNotYetFound = false}
            break;
        case 3:
            if (Quantity <= CurrentInspiration) {CombinationNotYetFound = false}
            break;
        }
        
        if ((CombinationNotYetFound) && Attempts == 10) {
            ShowEventEnd();
            return;
        }
    }    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Trade Proposal")
    $('#EventNar').html(SelectedRandomRival + " proposes a trade. How do you respond?");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Accept Trade:<br/>Give " + SelectedRandomRival + " "+Quantity+" " + SelectedRandomResource + " and receive "+Quantity+" " + SelectedSecondRandomResource + " in return. \
                                    This will improve your relations");
    $('#EventOption1Button').show();

    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Deny Trade:<br/>Give nothing and gain nothing. This will Increase tension between your tribes.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 302;
}

function EC_ProposedTrade_Accept() {
    var Quantity = Math.max(CurrentEra,5);   
    switch (SelectedRandomResourceValue) {
        case 1:
            DecrementSupply(Quantity);
            break;
        case 2:
            DecrementDomain(Quantity);
            break;
        case 3:
            DecrementInspiration(Quantity);
            break;
    }
    switch (SelectedSecondRandomResourceValue) {
        case 1:
            IncrementSupply(Quantity);
            break;
        case 2:
            IncrementDomain(Quantity);
            break;
        case 3:
            IncrementInspiration(Quantity);
            break;
    }
    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension = LongTalonTribeTension - CultureLevel;
            LongTalonTribeVictoryLevel++;
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            break;
        case 2:
            ShiningScalesTension = ShiningScalesTension - CultureLevel;
            ShiningScalesVictoryLevel++;
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            break;
    }
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Trade Proposal")    
    $('#EventNar').html("You accept the trade.\
                        <br/>This has decreased tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}
    


function EC_ProposedTrade_Deny() {
    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension++;
            break;
        case 2:
            ShiningScalesTension++;
            break;
    }  
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Trade Proposal")    
    $('#EventNar').html("You refuse to surrender your resources to " + SelectedRandomRival + ": \
                        <br/>This has increased tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Wayward And Desperate -----------------------------------------------------------

function E_WaywardAndDesperate() {
    WaywardAndDesperateExperienced = true;
    SelectRandomRival();
    SelectSelectedRandomTribal();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Wayward and Desperate")

    $('#EventNar').html("A wayward "+ SelectedRandomTribal +" of "+SelectedRandomRival+" is found lost and desperate.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Aid\
                                    <br/>The "+SelectedRandomTribal+" is to be fed and aided and sent on his way. This will cost 4 <span style=\"color: rgb(178, 0, 0);\">Supply</span> and decrease Tension between your tribes");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Abandon\
                                       <br/>Spend no supply and leave them to their fate or put them out of their misery. The result will be the same. This will have no effect on your tribe.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 304;
}

function EC_WaywardAndDesperate_Aid() {
    DecrementSupply(4);    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension--;
            LongTalonTribeTension--;
            WaywardKindLongTalon = true;
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            break;
        case 2:
            ShiningScalesTension--;
            ShiningScalesTension--;
            WaywardKindShiningScales = true;
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            break;
    }
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Wayward and Desperate")    
    $('#EventNar').html("You nourish the "+SelectedRandomTribal+ " and send them on their way. \
                        " +SelectedRandomRival + " will be greatful for your show kindness.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Assist ----------------------------------------------------------------------


function E_Alliance() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")
    $('#EventNar').html("Tensions between the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> and the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> are high. You could support one side over the other to sway the outcome of their rivalry in your favor.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Assist the <span style=\"color: DarkGoldenRod;\">Shining Scales</span><br/>\
                                    Aid the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> in their endeavors. This will significantly reduce Tension between your tribes and move you both closer to victory \
                                    while increasing tension between you and the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>, setting them back significantly.");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Assist the <span style=\"color: OrangeRed;\">Long Talon Tribe</span><br/>\
                                    Aid the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> in their endeavors. This will significantly reduce Tension between your tribes and move you both closer to victory \
                                    while increasing tension between you and the Shining Scales, setting them back significantly.");
    $('#EventOption2Button').show();
    
    $('#EventOption3Description').show();
    $('#EventOption3Description').html("Turn Away<br/>\
                                       You will play no part. The outcome will be left to fate.");
    $('#EventOption3Button').show();
    
    EventLoadedValue = 305;
    
}

function EC_Alliance_AssistShiningScales() {
    
    ShiningScalesTension = ShiningScalesTension - 8;
    ShiningScalesVictoryLevel++;
    ShiningScalesVictoryLevel++;
    if (ShiningScalesTension < 0) {ShiningScalesTension = 0}

    LongTalonTribeTension = LongTalonTribeTension + 4;
    LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - 4;
    if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0}
    
    var WarriorEffectiveness = CurrentNumberOfWarriors;
    if (ImprovedRaidTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)};
    if (Agenda == 1) {WarriorEffectiveness = Math.floor(WarriorEffectiveness + WarRation)}
    var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1));
    var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1));
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")   
    $('#EventNar').html("You assist the <span style=\"color: DarkGoldenRod;\">Shining Scales</span>. \
                        With your support, significant damage was done to the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> and your reputation with them. The bond between you and the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> was strengthened\
                        <br/><br/>Your share of the spoils includes "+GainedSupply+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> and "+GainedDomain+" <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
    
}

function EC_Alliance_AssistLongTalonTribe() {
    
    LongTalonTribeTension = LongTalonTribeTension - 8;
    LongTalonTribeVictoryLevel++;
    LongTalonTribeVictoryLevel++;
    if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}

    ShiningScalesTension = ShiningScalesTension + 4;
    ShiningScalesVictoryLevel = ShiningScalesVictoryLevel - 4;
    if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0}
    
    var WarriorEffectiveness = CurrentNumberOfWarriors;
    if (ImprovedRaidTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)};
    if (Agenda == 1) {WarriorEffectiveness = Math.floor(WarriorEffectiveness + WarRation)}
    var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1));
    var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1));
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")   
    $('#EventNar').html("You assist the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>. \
                        With your support, significant damage was done to the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> and your reputation with them. The bond between you and the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> was strengthened\
                        <br/><br/>Your share of the spoils includes "+GainedSupply+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> and "+GainedDomain+" <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
    
}

function EC_Alliance_TurnAway() {
    RefreshEvent();
    var ShiningScalesRoll = Math.floor((Math.random()*10)+1) + ShiningScalesVictoryLevel
    var LongTalonTribeRoll = Math.floor((Math.random()*10)+1) + LongTalonTribeVictoryLevel
 
    if (ShiningScalesRoll > LongTalonTribeRoll) {
        $('#EventNar').html("The rival tribes are left to their own devices. Ultimately, the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> come out on top.");
        ShiningScalesVictoryLevel = ShiningScalesVictoryLevel + 4; 
        LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - 4;
        if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0}
    }else if (LongTalonTribeRoll > ShiningScalesRoll) {
        $('#EventNar').html("The rival tribes are left to their own devices. Ultimately, the <span style=\"color: OrangeRed;\">Long Talon Tribe</span> comes out on top.");
        LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel + 4;
        ShiningScalesVictoryLevel = ShiningScalesVictoryLevel - 4;       
        if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0}
        
    }else{
        LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - 3;
        if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0}
        ShiningScalesVictoryLevel = ShiningScalesVictoryLevel - 3;
        if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0}
        $('#EventNar').html("The rival tribes are left to their own devices. Ultimately, there is no clear victor and both tribes suffer mutual loss.");
    }
    

    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")   
    $('#EventNar').html("You deny the "+SelectedRandomRival+ ". \
                        This has increased the tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

//Council of Elders -------------------------------------------------------------

function E_CouncilOfElders() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Council Of Elders")

    $('#EventNar').html("A council of Elders is called in your Tribe to discuss your agenda for the coming age. Which will you adapt? \
                        This agenda will remain for 8 Eras.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("<span class=\"LargerText\">Path of War</span><br/>\
                                    This will improve the effectiveness of your raids by rationing a quarter of your <span style=\"color: rgb(178, 0, 0);\">Supply</span> bounty.");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("<span class=\"LargerText\">Path of Peace</span><br/>\
                                       This will slow the increase of Tension over time.  You will not be allowed to raid.");
    $('#EventOption2Button').show();
    
    $('#EventOption3Description').show();
    $('#EventOption3Description').html("<span class=\"LargerText\">Path of Seclusion</span><br/>\
                                       This will forbid your Tribe from bartering or raiding as they focus inward. Your bounty will increase for each resource.");
    $('#EventOption3Button').show();
    
    $('#EventOption4Description').show();
    $('#EventOption4Description').html("<span class=\"LargerText\">The Middle Path</span><br/>\
                                       This will have no effect on your Tribe, keeping your options open.");
    $('#EventOption4Button').show();
    EventLoadedValue = 306;    
}

function EC_CouncilOfElders_PathOfWar() {
    $('#Path_Of_War').show();
    $('#Path_Of_Peace').hide();
    $('#Path_Of_Seclusion').hide();
    Agenda = 1;
    AgendaDuration = 8;    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Council of Elders")   
    $('#EventNar').html("You have chosen the Path of War. May your enemies feel your strength!");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
}

function EC_CouncilOfElders_PathOfPeace() {
    $('#Path_Of_War').hide();
    $('#Path_Of_Peace').show();
    $('#Path_Of_Seclusion').hide();
    Agenda = 2;
    AgendaDuration = 8;    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Council of Elders")   
    $('#EventNar').html("You have chosen the Path of Peace. May you live long and prosper.");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
}

function EC_CouncilOfElders_PathOfSeclusion() {
    $('#Path_Of_War').hide();
    $('#Path_Of_Peace').hide();
    $('#Path_Of_Seclusion').show();
    Agenda = 3;
    AgendaDuration = 8;    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Council of Elders")   
    $('#EventNar').html("You have chosen the Path of Seclusion. Security, Solidarity, and inner growth will be your bounty.");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
}

function EC_CouncilOfElders_MiddlePath() {
    $('#Path_Of_War').hide();
    $('#Path_Of_Peace').hide();
    $('#Path_Of_Seclusion').hide();
    Agenda = 4;
    AgendaDuration = 8;    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Council of Elders")   
    $('#EventNar').html("You have chosen the Middle Path. May you find prosperity in the balance.");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
}

// Discovery Logic ---------------------------------------------------------------

function E_Discover() {
    if (MapOfTheAncients > 0 && AncientGarden > 0 && AncientCache > 0 && PinnacleStone > 0 && SpearOfTheAncients > 0) {return} 
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Discovery")
    $('#EventNar').html("Your explorers claim they have found clues that might lead to a discovery. Would you like them to search for this discovery?");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Follow the clues: " + TotalDiscoveryDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#EventOption1Button').show();
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore the clues and carry on.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 101;
}

function E_DiscoverNotEnough(){
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Discovery")
    $('#EventNar').html("Your explorers claim they have found clues that might lead to a discovery. With "+TotalDiscoveryDomainCost+" stashed <span style=\"color: rgb(207, 166, 0);\">Domain</span> \
                         they might uncover something important.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
}

function EC_ClaimDiscovery(){
    CurrentDiscovery++
    var DiscoveryString = "";
    var TryAgain = true;
    while (TryAgain) {
        switch (Math.floor((Math.random()*5)+1)) {
            case 1:
                if (MapOfTheAncients == 0)
                {
                    MapOfTheAncients = 1;
                    DecrementDomain(TotalDiscoveryDomainCost);
                    $("#Map_Of_The_Ancients").show();
                    TryAgain = false;
                    DiscoveryString = "Map of the Ancients";
                }                
                break;
            case 2:
                if (AncientGarden == 0)
                {
                    AncientGarden = 1;
                    DecrementDomain(TotalDiscoveryDomainCost);
                    $("#Ancient_Garden").show();
                    TryAgain = false;
                    DiscoveryString = "Ancient Garden";
                } 
                break;
            case 3:
                if (AncientCache == 0)
                {
                    AncientCache = 1;
                    DecrementDomain(TotalDiscoveryDomainCost);
                    $("#Ancient_Cache").show();
                    TryAgain = false;
                    DiscoveryString = "Ancient Cache";
                } 
                break;
            case 4:
                if (PinnacleStone == 0)
                {
                    PinnacleStone = 1;
                    DecrementDomain(TotalDiscoveryDomainCost);
                    $("#Pinnacle_Stone").show();
                    TryAgain = false;
                    DiscoveryString = "Pinnacle Stone";
                } 
                break;
            case 5:
                if (SpearOfTheAncients == 0)
                {
                    SpearOfTheAncients = 1;
                    DecrementDomain(TotalDiscoveryDomainCost);
                    $("#Spear_Of_The_Ancients").show();
                    TryAgain = false;
                    DiscoveryString = "Spear of the Ancients";
                } 
                break;
        }
        
        RefreshPage();
    }
    
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Discovery")    
    $('#EventNar').html("Your tribe discovered the " + DiscoveryString + "!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();  
}
//Competition-----------

function ShowEventEnd() {
    RefreshEvent();
    CurrentPhase = 0;
    CurrentEra++
    RefreshPage();
    //$('#EventResultBoxHeader').show()
    //$('#EventResultBoxHeader').html("Calm")    
    //$('#EventNar').html("A new Era Begins.");        
    //$('#EventOption1Button').show();
    //RefreshPage();
}

function CalculateLongTalonTribeRaided() {
    var GripCost = Math.min(LongTalonTribeTension, CurrentGrip);
    var DoubleGripCost = Math.floor(GripCost*2.5)
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html("The <span style=\"color: OrangeRed;\">Long Talon Tribe</span> is Raiding you! They are pillaging your territory for <span style=\"color: rgb(178, 0, 0);\">Supply</span> and belittling your supremacy with shows of power.<br/> \
                        How will you protect what is yours?");
    
    if (CurrentSupply > 0 && CurrentGrip > 0) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Defend Resources\
                                        <br/>Spend " + GripCost + " <span style=\"color: grey;\">Grip</span> to protect your <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
        $('#EventOption1Button').show();
    }    
    if (CurrentSupremacy > 0 && CurrentGrip > 0) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Defend Interests\
                                           <br/>Spend " + GripCost + " <span style=\"color: grey;\">Grip</span> to protect your Supremacy.");
        $('#EventOption2Button').show();
    }
    if (CurrentGrip >= DoubleGripCost && CurrentSupremacy > 0 && CurrentSupply > 0 && CurrentGrip > 0) {
        $('#EventOption3Description').show();
        $('#EventOption3Description').html("Full Defense\
                                           <br/>Spend " + DoubleGripCost + " <span style=\"color: grey;\">Grip</span> to fully defend.");
        $('#EventOption3Button').show();
    }
    
    $('#EventOption4Description').show();
    $('#EventOption4Description').html("Undefended\
                                       <br/>Spend no <span style=\"color: grey;\">Grip</span> to conserve your warriors' efforts.");
    $('#EventOption4Button').show();    
    EventLoadedValue = 401;    
}

function LongTalonRaidKind() {
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    RefreshEvent();
    WaywardKindLongTalon = false;
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html("A device is left at the outskirts of your settlement. Upon inspection you see that it is a sort of makeshift totem\
                        crafted from the supplies once used to aid a wayward and desperate member of the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>.\
                        You know now that the debt has been paid. You will not be raided this day.");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateLongTalonTribeRaided_DefendResources(){
    RefreshEvent();
    var Damage = LongTalonTribeTension;
    var GripCost = Math.min(LongTalonTribeTension, CurrentGrip);
    var SupremacyDamage = LongTalonTribeTension;
    var ProtectedText = ""
    var UnprotectedText = ""    
    
    
    if (GripCost == Damage) {
        Damage = 0;
        ProtectedText = ("You were able to protect all of your <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
    }else {
        Damage = Damage - GripCost;
        if (Damage > CurrentSupply) {Damage = CurrentSupply}
        ProtectedText = ("In the raid, only "+Damage+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> was lost.");
        DecrementSupply(Damage);
        LongTalonTribeVictoryLevel++
    }    
    DecrementGrip(GripCost);
    if (CurrentSupremacy != 0) {
        SupremacyDamage = SupremacyDamage*3
        if (SupremacyDamage > CurrentSupremacy) {SupremacyDamage = CurrentSupremacy}
        DecrementSupremacy(SupremacyDamage);
        UnprotectedText = ("<br/>Encrouching on your territory as they have, and leaving decimation in their wake, your Supremacy has been reduced by "+SupremacyDamage)
        LongTalonTribeVictoryLevel++
    }else{UnprotectedText = ("<br/>You had no Supremacy to lose.")}
    
    var WarriorsLostText = CalculateWarriorsLost(LongTalonTribeVictoryLevel);
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html(ProtectedText + UnprotectedText + WarriorsLostText);
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateLongTalonTribeRaided_DefendInterests(){
    RefreshEvent();
    var Damage = LongTalonTribeTension;
    var GripCost = Math.min(LongTalonTribeTension, CurrentGrip);
    var SupremacyDamage = LongTalonTribeTension;
    var ProtectedText = ""
    var UnprotectedText = ""
    
    if (GripCost < SupremacyDamage) {
        SupremacyDamage = 0;
        ProtectedText = ("You were able to maintain all of your Supremacy.");
    }else {
        SupremacyDamage = SupremacyDamage - GripCost;
        if (SupremacyDamage > CurrentSupremacy) {SupremacyDamage = CurrentSupremacy}
        ProtectedText = ("In the raid, only "+SupremacyDamage+" Supremacy was lost.");
        DecrementSupremacy(SupremacyDamage);
        LongTalonTribeVictoryLevel++
    }
    
    DecrementGrip(GripCost);
    if (CurrentSupply != 0) {
        Damage = Damage*3
        if (Damage > CurrentSupply) {Damage = CurrentSupply}
        DecrementSupply(Damage);
        UnprotectedText = ("<br/>" + Damage + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was lost.")
        LongTalonTribeVictoryLevel++
    }else{UnprotectedText = ("<br/>You had no <span style=\"color: rgb(178, 0, 0);\">Supply</span> to lose.")}
    
    var WarriorsLostText = CalculateWarriorsLost(LongTalonTribeTension);
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html(ProtectedText + UnprotectedText + WarriorsLostText);
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateLongTalonTribeRaided_FullDefense(){
    RefreshEvent();
    var DoubleGripCost = Math.floor(LongTalonTribeTension*2.5);
    DecrementGrip(DoubleGripCost);
    
    var WarriorsLostText = CalculateWarriorsLost(LongTalonTribeTension);
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html("The <span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span> was unnable to shake your grip." + WarriorsLostText);
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateLongTalonTribeRaided_Undefended() {
    RefreshEvent();
    var Damage = LongTalonTribeTension*3;
    var SupremacyDamage = LongTalonTribeTension*3;
    var UnProtectedText = ""
    var UnProtectedText2 = ""
    
    if (CurrentSupremacy == 0) {
        SupremacyDamage = 0;
        UnProtectedText = ("You had no Sepremacy to lose.");
    }else {
        if (SupremacyDamage > CurrentSupremacy) {SupremacyDamage = CurrentSupremacy}
        UnProtectedText = ("In the raid "+SupremacyDamage+" Supremacy was lost.");
        DecrementSupremacy(SupremacyDamage);
        LongTalonTribeVictoryLevel++
    }
    if (CurrentSupply == 0) {
        Damage = 0;
        UnProtectedText2 = ("You had no <span style=\"color: rgb(178, 0, 0);\">Supply</span> to lose.");
    }else {
        if (Damage > CurrentSupply) {Damage = CurrentSupply}
        UnProtectedText2 = ("<br/>"  +Damage+" <span style=\"color: rgb(178, 0, 0);\">Supply</span> was lost.");
        DecrementSupply(Damage);
        LongTalonTribeVictoryLevel++
    }

    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: OrangeRed;\">Long Talon Tribe Raid</span>")  
    $('#EventNar').html(UnProtectedText + UnProtectedText2);
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided() {    
    var GripCost = Math.min(ShiningScalesTension, CurrentGrip);
    var DoubleGripCost = Math.floor(GripCost*2.5)
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html("The <span style=\"color: DarkGoldenRod;\">Shining Scales</span> is Raiding you! They are cutting off your <span style=\"color: rgb(207, 166, 0);\">Domain</span> and hunting down your Discoveries to claim them as their own.<br/> \
                        How will you protect what is yours?");
    
    if (CurrentDomain > 0 && CurrentGrip > 0) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Defend Resources\
                                        <br/>Spend " + GripCost + " <span style=\"color: grey;\">Grip</span> to protect your <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
        $('#EventOption1Button').show();
    }    
    if (CurrentDiscovery > 0 && CurrentGrip > 0) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Defend Interests\
                                           <br/>Spend " + GripCost + " <span style=\"color: grey;\">Grip</span> to protect your Discoveries.");
        $('#EventOption2Button').show();
    }
    if (CurrentGrip >= DoubleGripCost && CurrentDiscovery > 0 && CurrentDomain > 0 && CurrentGrip > 0) {
        $('#EventOption3Description').show();
        $('#EventOption3Description').html("Full Defense\
                                           <br/>Spend " + DoubleGripCost + " <span style=\"color: grey;\">Grip</span> to fully defend.");
        $('#EventOption3Button').show();
    }
    
    $('#EventOption4Description').show();
    $('#EventOption4Description').html("Undefended\
                                       <br/>Spend no <span style=\"color: grey;\">Grip</span> to conserve your warriors' efforts.");
    $('#EventOption4Button').show();
    
    EventLoadedValue = 402;  
}

function ShiningScalesRaidKind() {
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    RefreshEvent();
    WaywardKindShiningScales = false;
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html("A device is left at the outskirts of your settlement. Upon inspection you see that it is a sort of makeshift totem\
                        crafted from the supplies once used to aid a wayward and desperate member of the <span style=\"color: DarkGoldenRod;\">Shining Scales</span>.\
                        You know now that the debt has been paid. You will not be raided this day.");
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided_DefendResources(){
    RefreshEvent();
    var Damage = ShiningScalesTension;
    var GripCost = Math.min(ShiningScalesTension, CurrentGrip);
    var LostDiscovery = ""
    var ProtectedText = ""
    var UnprotectedText = ""
    
    if (GripCost == Damage) {
        Damage = 0;
        ProtectedText = ("You were able to protect all of your <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
    }else {
        Damage = Damage - GripCost;
        if (Damage > CurrentDomain) {Damage = CurrentDomain}
        ProtectedText = ("In the raid, only "+Damage+" <span style=\"color: rgb(207, 166, 0);\">Domain</span> was lost.");
        DecrementDomain(Damage);
        ShiningScalesVictoryLevel++
    }    
    DecrementGrip(GripCost);
    if (CurrentDiscovery != 0) {
        var DiscoveryLostChance =  Math.floor((Math.random()*50)+1)
        if (DiscoveryLostChance < ShiningScalesTension) {
            LostDiscovery = SelectRandomFoundDiscovery();
            UnprotectedText = ("<br/>While your focus was elsewhere, they were able to claim the "+LostDiscovery+"!")
            ShiningScalesVictoryLevel++            
        }else{UnprotectedText = ("<br/>Despite their best efforts, they were unnable to claim one of your discoveries.")}
    }else{UnprotectedText = ("<br/>You had no Discoveries to lose.")}
    
    var WarriorsLostText = CalculateWarriorsLost(ShiningScalesTension);
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html(ProtectedText + UnprotectedText + WarriorsLostText);
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided_DefendInterests(){
    RefreshEvent();
    var Damage = ShiningScalesTension;
    var GripCost = Math.min(ShiningScalesTension, CurrentGrip);
    var LostDiscovery = ""
    var ProtectedText = ""
    var UnprotectedText = ""
 
    if (GripCost < Damage) {
        var DiscoveryLostChance =  ((Math.floor((Math.random()*50)+1)) + (GripCost))
        if (DiscoveryLostChance < ShiningScalesTension) {
            LostDiscovery = SelectRandomFoundDiscovery();
            ProtectedText = ("<br/>Dispite your best efforts, they were able to claim the "+LostDiscovery+"!")
            ShiningScalesVictoryLevel++            
        }else{ProtectedText = ("<br/>Your efforts paid off! They were unnable to claim any of your discoveries.")}
    }else{ProtectedText = ("<br/>Your efforts paid off! They were unnable to claim any of your discoveries.")}    

    if (CurrentDomain != 0) {
        Damage = Damage*3
        if (Damage > CurrentDomain) {Damage = CurrentDomain}
        DecrementDomain(Damage);
        UnprotectedText = ("<br/>" + Damage + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> was lost.")
        ShiningScalesVictoryLevel++
    }else{UnprotectedText = ("<br/>You had no <span style=\"color: rgb(207, 166, 0);\">Domain</span> to lose.")}
    
    var WarriorsLostText = CalculateWarriorsLost(ShiningScalesTension);
    
    DecrementGrip(GripCost);
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html(ProtectedText + UnprotectedText + WarriorsLostText);
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided_FullDefense(){
    RefreshEvent();
    var DoubleGripCost = Math.floor(ShiningScalesVictoryLevel*2.5);
    var WarriorsLostText = CalculateWarriorsLost(ShiningScalesTension);
    DecrementGrip(DoubleGripCost);
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html("The <span style=\"color: DarkGoldenRod;\">Shining Scales raid</span> was unnable to shake your grip." + WarriorsLostText);
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided_Undefended() {
    RefreshEvent();
    var Damage = ShiningScalesTension;
    var GripCost = Math.min(ShiningScalesTension, CurrentGrip);
    var LostDiscovery = ""
    var UnProtectedText = ""
    var UnprotectedText2 = ""
 
    if (CurrentDiscovery > 0) {
        var DiscoveryLostChance =  Math.floor((Math.random()*50)+1)
        if (DiscoveryLostChance < ShiningScalesTension) {
            LostDiscovery = SelectRandomFoundDiscovery();
            UnProtectedText = ("<br/>They were able to claim the "+LostDiscovery+"!")
            ShiningScalesVictoryLevel++            
        }else{UnProtectedText = ("<br/>They were unnable to claim any of your discoveries.")}
    }else{UnProtectedText = ("<br/>You had no Discoveries to claim.")}    

    if (CurrentDomain != 0) {
        Damage = Damage*3
        if (Damage > CurrentDomain) {Damage = CurrentDomain}
        DecrementDomain(Damage);
        UnprotectedText2 = ("<br/>" + Damage + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> was lost.")
        ShiningScalesVictoryLevel++
    }else{UnprotectedText2 = ("<br/>You had no <span style=\"color: rgb(207, 166, 0);\">Domain</span> to lose.")}
    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Shining Scales Raid</span>")  
    $('#EventNar').html(UnProtectedText + UnprotectedText2);
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    EventLoadedValue = 998;
    $('#EventOption1Button').show();
    RefreshPage();
}


// Common Code----------------------------------------

function SelectSelectedRandomTribal(){

    var RandomNumber = Math.floor((Math.random()*4)+1)
    switch (RandomNumber) {
        case 1:
            SelectedRandomTribal = "Hunter"
            SelectedRandomTribalValue = 1
            break;
        case 2:
            SelectedRandomTribal = "Explorer"
            SelectedRandomTribalValue = 2
            break;
        case 3:
            SelectedRandomTribal = "Crafter"
            SelectedRandomTribalValue = 3
            break;
        case 4:
            SelectedRandomTribal = "Warrior"
            SelectedRandomTribalValue = 4
            break;
    }
}

function SelectAndRemoveSelectedRandomTribal(){
var TribalNotFound = true
    while (TribalNotFound) {
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors < 1) {TribalNotFound = false}
        var RandomNumber = Math.floor((Math.random()*4)+1)
        switch (RandomNumber) {
            case 1:
                if (CurrentNumberOfHunters > 0) {
                    SelectedRandomTribal = "Hunter"
                    SelectedRandomTribalValue = 1
                    CurrentNumberOfHunters--;
                    TribalNotFound = false
                }
                break;
            case 2:
                if (CurrentNumberOfExplorers > 0) {
                    SelectedRandomTribal = "Explorer"
                    SelectedRandomTribalValue = 2
                    CurrentNumberOfExplorers--;
                    TribalNotFound = false
                }
                break;
            case 3:
                if (CurrentNumberOfCrafters > 0) {
                    SelectedRandomTribal = "Crafter"
                    SelectedRandomTribalValue = 3
                    CurrentNumberOfCrafters--;
                    TribalNotFound = false
                }

                break;
            case 4:
                if (CurrentNumberOfWarriors > 0) {
                    SelectedRandomTribal = "Warrior"
                    SelectedRandomTribalValue = 4
                    CurrentNumberOfWarriors--;
                    TribalNotFound = false
                }
                break;

        }
    }
}

function SelectAndAddRandomNeededTribal() {
    if (CurrentPopulation < (5+(ExpansionLevel*3))) {
            SelectedRandomTribal = "";
            SelectedRandomTribalValue = 0;
            
            if (CurrentNumberOfHunters == 0) {
                SelectedRandomTribal = "Hunter"
                SelectedRandomTribalValue = 1
                CurrentNumberOfHunters++
            }else{
                var HunterDif = HunterExpansionBonus - CurrentNumberOfHunters;
                var ExplorerDif = ExplorerExpansionBonus - CurrentNumberOfExplorers;
                var CrafterDif = CrafterExpansionBonus - CurrentNumberOfCrafters;
                var WarriorDif = WarriorExpansionBonus - CurrentNumberOfWarriors;
                
                var MaxValue = Math.max(HunterDif,ExplorerDif,CrafterDif,WarriorDif);
                var NewTribeMemberNotYetFound = true;
                while (NewTribeMemberNotYetFound) {
                    var RandomNumber = Math.floor((Math.random()*4)+1)
                    switch (RandomNumber) {
                        case 1:
                            if (HunterDif == MaxValue) {
                                SelectedRandomTribal = "Hunter"
                                SelectedRandomTribalValue = 1
                                CurrentNumberOfHunters++
                                NewTribeMemberNotYetFound = false;
                            }
                            break;
                        case 2:
                            if (ExplorerDif == MaxValue) {
                                SelectedRandomTribal = "Explorer"
                                SelectedRandomTribalValue = 2
                                CurrentNumberOfExplorers++
                                NewTribeMemberNotYetFound = false;
                            }
                            break;
                        case 3:
                            if (CrafterDif == MaxValue) {
                                SelectedRandomTribal = "Crafter"
                                SelectedRandomTribalValue = 3
                                CurrentNumberOfCrafters++
                                NewTribeMemberNotYetFound = false;
                            }
                            break;
                        case 4:
                            if (WarriorDif == MaxValue) {
                                SelectedRandomTribal = "Warrior"
                                SelectedRandomTribalValue = 4
                                CurrentNumberOfWarriors++
                                NewTribeMemberNotYetFound = false;
                            }
                            break;
                    }        
                }
            }
    }
}

function SelectRandomRival(){
    if (!LongTalonTribePresent) {
        SelectedRandomRival = "<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>"
        SelectedRandomRivalValue = 2;
    }else{
        var RandomNumber = Math.floor((Math.random()*2)+1)
        switch (RandomNumber) {
            case 1:
                SelectedRandomRival = "<span style=\"color: OrangeRed;\">The Long Talon Tribe</span>"
                SelectedRandomRivalValue = 1;
                break;
            case 2:
                SelectedRandomRival = "<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>"
                SelectedRandomRivalValue = 2;
                break;
        }
    }
}

function SelectRandomResource(){

    var RandomNumber = Math.floor((Math.random()*3)+1)
    switch (RandomNumber) {
        case 1:
            SelectedRandomResource = "<span style=\"color: rgb(178, 0, 0);\">Supply</span>"
            SelectedRandomResourceValue = 1;
            break;
        case 2:
            SelectedRandomResource = "<span style=\"color: rgb(207, 166, 0);\">Domain</span>"
            SelectedRandomResourceValue = 2;
            break;
        case 3:
            SelectedRandomResource = "<span style=\"color: rgb(36, 71, 178);\">Inspiration</span>"
            SelectedRandomResourceValue = 3;
            break;
    }
    
}

function SelectSecondRandomResource(){

    var RandomNumber = Math.floor((Math.random()*3)+1)
    switch (RandomNumber) {
        case 1:
            SelectedSecondRandomResource = "<span style=\"color: rgb(178, 0, 0);\">Supply</span>"
            SelectedSecondRandomResourceValue = 1;
            break;
        case 2:
            SelectedSecondRandomResource = "<span style=\"color: rgb(207, 166, 0);\">Domain</span>"
            SelectedSecondRandomResourceValue = 2;
            break;
        case 3:
            SelectedSecondRandomResource = "<span style=\"color: rgb(36, 71, 178);\">Inspiration</span>"
            SelectedSecondRandomResourceValue = 3;
            break;
        }
                
        if (SelectedSecondRandomResourceValue == SelectedRandomResourceValue) {
            SelectSecondRandomResource();
    }
}

function SelectRandomFoundDiscovery(){
    if (CurrentDiscovery > 0) {
        CurrentDiscovery--
        var TryAgain = true;
        while (TryAgain) {
            switch (Math.floor((Math.random()*5)+1)) {
                case 1:
                    if (MapOfTheAncients > 0)
                    {
                        MapOfTheAncients = 0;
                        $("#Map_Of_The_Ancients").hide();
                        $('#MapOfTheAncientsResult').html("");
                        TryAgain = false;
                        DiscoveryString = "Map of the Ancients";
                    }                
                    break;
                case 2:
                    if (AncientGarden > 0)
                    {
                        AncientGarden = 0;
                        $("#Ancient_Garden").hide();
                        $('#AncientGardenResult').html("");
                        TryAgain = false;
                        DiscoveryString = "Ancient Garden";
                    } 
                    break;
                case 3:
                    if (AncientCache > 0)
                    {
                        AncientCache = 0;
                        $("#Ancient_Cache").hide();
                        $('#AncientCacheResult').html("");
                        TryAgain = false;
                        DiscoveryString = "Ancient Cache";
                    } 
                    break;
                case 4:
                    if (PinnacleStone > 0)
                    {
                        PinnacleStone = 0;
                        $("#Pinnacle_Stone").hide();
                        $('#PinnacleStoneResult').html("");
                        TryAgain = false;
                        DiscoveryString = "Pinnacle Stone";
                    } 
                    break;
                case 5:
                    if (SpearOfTheAncients > 0)
                    {
                        SpearOfTheAncients = 0;
                        $("#Spear_Of_The_Ancients").hide();
                        $('#SpearOfTheAncientsResult').html("");
                        TryAgain = false;
                        DiscoveryString = "Spear of the Ancients";
                    } 
                    break;
            }            
            
        }
        return DiscoveryString
    }
}

function PassXEras(NumberOfEras) {
    var Iterations = 0;
    while (NumberOfEras > Iterations) { 
        CalculateEraTensionIncrease();
        CalculateEraVictoryIncrease();
        CurrentEra++
        Iterations++
    }
}

function CalculateEraVictoryIncrease() {
    ShiningScalesVictoryLevel++
    if (LongTalonTribePresent) {LongTalonTribeVictoryLevel++}
}

//Following Functions Increment Stashes------------------------------------------------------
function IncrementSupply(Inc) {CurrentSupply = CurrentSupply +Inc}
function IncrementInspiration(Inc) {CurrentInspiration = CurrentInspiration +Inc}
function IncrementDomain(Inc) {CurrentDomain = CurrentDomain +Inc}
function IncrementGrip(Inc) {CurrentGrip = CurrentGrip +Inc}
function IncrementInfluence(Inc) {CurrentInfluence = CurrentInfluence +Inc}
function IncrementSupremacy(Inc){CurrentSupremacy = CurrentSupremacy +Inc}

//Following Functions Decrement Stashes--------------------------------------------------------
function DecrementSupply(Dec) {
    if ((CurrentSupply - Dec) < 0) {CurrentSupply = 0;}    
    else {CurrentSupply = CurrentSupply - Dec;}
}
function DecrementInspiration(Dec) {    
    if ((CurrentInspiration - Dec) < 0) {CurrentInspiration = 0;}    
    else {CurrentInspiration = CurrentInspiration - Dec;}
}
function DecrementDomain(Dec) {    
    if ((CurrentDomain - Dec) < 0) {CurrentDomain = 0;}    
    else {CurrentDomain = CurrentDomain - Dec;}
}
function DecrementGrip(Dec) {    
    if ((CurrentGrip - Dec) < 0) {CurrentGrip = 0;}    
    else {CurrentGrip = CurrentGrip - Dec;}
}
function DecrementSupremacy(Dec) {
    if ((CurrentSupremacy - Dec) < 0) {CurrentSupremacy = 0;}    
    else {CurrentSupremacy = CurrentSupremacy - Dec;}
}

function DecrementInfluence(Dec) {
    if ((CurrentInfluence - Dec) < 0) {CurrentInfluence = 0;}    
    else {CurrentInfluence = CurrentInfluence - Dec;}
}

function CalculateWarriorsLost(Strength) {
    var WarriorsLostText = ""
    var NumberOfWarriorsLost = Math.floor(Math.random() * (Strength/10))
    if (NumberOfWarriorsLost > 0) {
        if (NumberOfWarriorsLost > Math.floor(CurrentNumberOfWarriors/2)) {NumberOfWarriorsLost = Math.floor(CurrentNumberOfWarriors/2)}
        CurrentNumberOfWarriors = CurrentNumberOfWarriors - NumberOfWarriorsLost; 
    }    
    if (NumberOfWarriorsLost > 1) {WarriorsLostText  = ("<br/>" + NumberOfWarriorsLost + " warriors died during the raid")}
    else if (NumberOfWarriorsLost == 1) {WarriorsLostText  = ("<br/>1 of your warriors died during the raid")}
    
    return WarriorsLostText
}


}
$(document).ready(main);

