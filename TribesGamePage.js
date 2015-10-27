var main = function() {

//Global Variables

var CurrentPhase = 99;
var PurchaseUpgradeLoadedUpgrade = 0;
var LoadedAction = 0;
var CurrentEra = 1;

var CurrentNumberOfHunters = 1;
var CurrentNumberOfCrafters = 1;
var CurrentNumberOfExplorers = 1;
var CurrentNumberOfWarriors = 1;
var CurrentPopulation = 4;

var HunterMultiplier = 1;
var CrafterMultiplier = 1;
var ExplorerMultiplier = 1;
var WarriorMultiplier = 1;

var CurrentSupply = 10;
var CurrentInspiration = 10;
var CurrentDomain = 10;
var CurrentGrip = 1000;

var CurrentSupremacy = 0;
var CurrentDiscovery = 0;
var CurrentInfluence = 0;

var TotalPopulationBoomCost = 0;
var TotalInspirationSurplusCost = 0;
var TotalDomainSurplusCost = 0;
var TotalGripSurplusCost = 0;

var SupplySurplus = false;
var InspirationSurplus = false;
var DomainSurplus = false;
var GripSurplus = false;

var TotalInventionInspirationCost = 0;
var InventionLevel = 1;
var Pottery = false;
var ImprovedWarTactics = false;

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

var MapOfTheAncients = 0;
var AncientGarden = 0;
var AncientCache = 0;
var PinnacleStone = 0;
var SpearOfTheAncients = 0;

var RaidingCost = 0;
var BarteringCost = 0;

var ShiningScalesVictoryLevel = 1;
var LongTalonTribeVictoryLevel = 1;
var FolkOfTheWindingFlowVictoryLevel = 1;
var VictoryLevelCap = 50;
var VictoryOrLossAchieved = false;

var ShiningScalesTension = 1;
var LongTalonTribeTension = 1;
var FolkOfTheWindingFlowTension = 1;
var TensionCap = 30;

var EventLoadedValue = 0;

var SelectedRandomTribal = "";
var SelectedRandomTribalValue = 0;
var SelectedRandomRival = "";
var SelectedRandomRivalValue = 0;
var SelectedSecondRandomRival = "";
var SelectedSecondRandomRivalValue = 0;
var SelectedRandomResource = "";
var SelectedRandomResourceValue = 0;
var SelectedSecondRandomResource = "";
var SelectedSecondRandomResourceValue = 0;

window.onload = function() {
    $("#IntroDivHeader").html("New World")
    $("#IntroDivStory").html("You arrive in this new world with your kin and a handful of resources, not least of which is hope. \
                             The great serpent monolith looms in the distance.\
                             You are quickly faced with your first decision. Where will you settle? \
                             <br/><span class=\"OOC\">Select a location from the options below to learn more.</span>")
    $('#ShiningScalesRaid').hide();
    $('#ShiningScalesBarter').hide();
    $('#LongTalonTribeRaid').hide();
    $('#LongTalonTribeBarter').hide();
    $('#FolkOfTheWindingFlowRaid').hide();
    $('#FolkOfTheWindingFlowBarter').hide();
    RefreshPage();
};

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
    
    ExpansionLevel = NumberOfForestExpansions + NumberOfRiverExpansions + NumberOfSavannaExpansions + NumberOfHillExpansions
    
    CalculateSurplusDisplay();
    
    $('#NumberOfExpansion').text(ExpansionLevel);
    $("#StashedSupremacy").text(CurrentSupremacy);
    $("#NumberOfDiscovery").text(CurrentDiscovery);
    $("#StashedInfluence").text(CurrentInfluence);
    $("#NumberOfCulture").text(CultureLevel);
    
    ClearUpgradeInfoBox();
    
    CalculateTribalCosts();
    
    CalculateVictory();
    if (VictoryOrLossAchieved) {CurrentPhase = 5}
    switch (CurrentPhase) {
        case 0:
            $('#IntroDiv').hide();
            $('#BeginEra').fadeIn();
            $('#UpgradeBox').fadeIn();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            break;
        case 1:
            $('#BeginEra').hide();
            $('#UpgradeBox').hide();
            $('#HarvestResultBox').fadeIn();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            break;
        case 2:
            $('#BeginEra').hide();
            $('#UpgradeBox').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').fadeIn();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            break;
        case 4:
            $('#BeginEra').hide();
            $('#UpgradeBox').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#CompetitionResultBox').hide();
            $('#ActionResultBox').fadeIn();
            $('#EndOfGameResultBox').hide();
            break;
        case 5:
            $('#BeginEra').hide();
            $('#UpgradeBox').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').fadeIn();
            break;
        case 99:
            $('#IntroDiv').fadeIn();
            $('#BeginEra').hide();
            $('#UpgradeBox').hide();
            $('#HarvestResultBox').hide();
            $('#EventResultBox').hide();
            $('#ActionResultBox').hide();
            $('#EndOfGameResultBox').hide();
            break;         
        
    }
        CompetitionDetails();
        DisplayDetails();
        
}

function DisplayDetails() {
    $('#D_Population').html(CurrentPopulation);
    $('#D_Era').html(CurrentEra);
    
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
    $('#D_FolkOfTheWindingFlowTension').html(FolkOfTheWindingFlowTension);
    $('#D_FolkOfTheWindingFlowVictory').html(FolkOfTheWindingFlowVictoryLevel);
    
    if (CurrentSupremacy > CurrentInfluence && CurrentSupremacy > CurrentDiscovery * 100) {
        $('#DetailImage').attr("src","http://i.imgur.com/N4Uepe3.jpg");
    }else if (CurrentInfluence > CurrentSupremacy && CurrentInfluence > CurrentDiscovery * 100) {
        $('#DetailImage').attr("src","http://i.imgur.com/MzfHbw2.jpg");
    }else if (CurrentDiscovery * 100 > CurrentInfluence && CurrentDiscovery * 100 > CurrentSupremacy) {
        $('#DetailImage').attr("src","http://i.imgur.com/DnKwg6g.jpg");
    }
    
}

function CalculateTribalCosts(){
    CurrentPopulation = CurrentNumberOfHunters + CurrentNumberOfCrafters + CurrentNumberOfExplorers + CurrentNumberOfWarriors
    
    TotalPopulationBoomCost = Math.floor((3 * Math.pow(1.15, CurrentPopulation)));
 
    TotalInspirationSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfCrafters)));

    TotalDomainSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfExplorers)));

    TotalGripSurplusCost = Math.floor((5 * Math.pow(1.15, CurrentNumberOfWarriors)));

    HunterToolInspirationCost = Math.floor((10 * HunterMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    CrafterToolInspirationCost = Math.floor((10 * CrafterMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    ExplorerToolInspirationCost = Math.floor((10 * ExplorerMultiplier) * Math.pow(1.07,ImprovedToolsLevel));
    WarriorToolInspirationCost = Math.floor((10 * WarriorMultiplier) * Math.pow(1.07,ImprovedToolsLevel));    
    
    TotalExpansionDomainCost = Math.floor((15 * ExpansionLevel) * Math.pow(1.15,ExpansionLevel));
    
    TotalCultureInspirationCost = Math.floor((5 * CultureLevel) * Math.pow(1.15,CultureLevel));

    TotalDiscoveryDomainCost = Math.floor((25 * (CurrentDiscovery+1)) * Math.pow(1.07,(CurrentDiscovery)));
    
    TotalInventionInspirationCost = Math.floor(30 * Math.pow(1.15,InventionLevel));
    
    RaidingCost = Math.floor((2 * (CurrentNumberOfWarriors)) * Math.pow(1.07,CurrentNumberOfWarriors));
    
    BarteringCost = Math.floor(2 * Math.pow(1.15,CultureLevel));
}

function CompetitionDetails() {
    //each tribe will have a scale of 1-20 tension and 1-100 victory
   
    switch (true) {
        case (ShiningScalesTension < (TensionCap / 3)):
            $('#ShiningScalesRelations').html('<span style=\"color: Green;\">You have an amiable relationship</span>')
            break;
        case (ShiningScalesTension < (TensionCap / 2)):
            $('#ShiningScalesRelations').html('<span style=\"color: Yellow;\">There seems to be some diplomatic tension</span>')
            break;
        case (ShiningScalesTension < (TensionCap / 1.2)):
            $('#ShiningScalesRelations').html('<span style=\"color: Orange;\">Tensions are glaring and apparent</span>')
            break;
        default:
            $('#ShiningScalesRelations').html('<span style=\"color: Red;\">Confrontation seems imminent</span>')
            $('#ShiningScalesBarter').hide();
            break;
    }
    
    switch (true) {
        case (LongTalonTribeTension < (TensionCap / 3)):
            $('#LongTalonTribeRelations').html('<span style=\"color: Green;\">You have an amiable relationship</span>')
            break;
        case (LongTalonTribeTension < (TensionCap / 2)):
            $('#LongTalonTribeRelations').html('<span style=\"color: Yellow;\">There seems to be some diplomatic tension</span>')
            break;
        case (LongTalonTribeTension < (TensionCap / 1.2)):
            $('#LongTalonTribeRelations').html('<span style=\"color: Orange;\">Tensions are glaring and apparent</span>')
            break;
        default:
            $('#LongTalonTribeRelations').html('<span style=\"color: Red;\">Confrontation seems imminent</span>')
            $('#LongTalonTribeBarter').hide();
            break;
    }
    
    switch (true) {
        case (FolkOfTheWindingFlowTension < (TensionCap / 3)):
            $('#FolkOfTheWindingFlowRelations').html('<span style=\"color: Green;\">You have an amiable relationship</span>')
            break;
        case (FolkOfTheWindingFlowTension < (TensionCap / 2)):
            $('#FolkOfTheWindingFlowRelations').html('<span style=\"color: Yellow;\">There seems to be some diplomatic tension</span>')
            break;
        case (FolkOfTheWindingFlowTension < (TensionCap / 1.2)):
            $('#FolkOfTheWindingFlowRelations').html('<span style=\"color: Orange;\">Tensions are glaring and apparent</span>')
            break;
        default:
            $('#FolkOfTheWindingFlowRelations').html('<span style=\"color: Red;\">Confrontation seems imminent</span>')
            $('#FolkOfTheWindingFlowBarter').hide();
            break;
    }

    switch (true) {
        case (ShiningScalesVictoryLevel < (VictoryLevelCap / 3)):
            $('#ShiningScalesProgress').html('<span style=\"color: Green;\">They seem to pose little threat</span>')
            break;
        case (ShiningScalesVictoryLevel < (VictoryLevelCap / 2)):
            $('#ShiningScalesProgress').html('<span style=\"color: Yellow;\">They are becoming an imposing presense</span>')
            break;
        case (ShiningScalesVictoryLevel < (VictoryLevelCap / 1.2)):
            $('#ShiningScalesProgress').html('<span style=\"color: Orange;\">Victory is within their grasp</span>')
            break;
        default:
            $('#ShiningScalesProgress').html('<span style=\"color: Red;\">They will claim victory soon!</span>')
            break;
    }

    switch (true) {
        case (LongTalonTribeVictoryLevel < (VictoryLevelCap / 3)):
            $('#LongTalonTribeProgress').html('<span style=\"color: Green;\">They seem to pose little threat</span>')
            break;
        case (LongTalonTribeVictoryLevel < (VictoryLevelCap / 2)):
            $('#LongTalonTribeProgress').html('<span style=\"color: Yellow;\">They are becoming an imposing presense</span>')
            break;
        case (LongTalonTribeVictoryLevel < (VictoryLevelCap / 1.2)):
            $('#LongTalonTribeProgress').html('<span style=\"color: Orange;\">Victory is within their grasp</span>')
            break;
        default:
            $('#LongTalonTribeProgress').html('<span style=\"color: Red;\">They will claim victory soon!</span>')
            break;
    }

    switch (true) {
        case (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap / 3)):
            $('#FolkOfTheWindingFlowProgress').html('<span style=\"color: Green;\">They seem to pose little threat</span>')
            break;
        case (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap / 2)):
            $('#FolkOfTheWindingFlowProgress').html('<span style=\"color: Yellow;\">They are becoming an imposing presense</span>')
            break;
        case (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap / 1.2)):
            $('#FolkOfTheWindingFlowProgress').html('<span style=\"color: Orange;\">Victory is within their grasp</span>')
            break;
        default:
            $('#FolkOfTheWindingFlowProgress').html('<span style=\"color: Red;\">They will claim victory soon!</span>')
            break;
    }
 
}

function CalculateSurplusDisplay(){
    if (SupplySurplus && !(Pottery)) {$('#SupplySurplusDenotion').html("<span style=\"color: Gold;\"> x2</span>")
    }else if (SupplySurplus && Pottery) {$('#SupplySurplusDenotion').html("<span style=\"color: Gold;\"> x2.5</span>")
    }else{$('#SupplySurplusDenotion').html("")}
    if (DomainSurplus && !(Pottery)) {$('#DomainSurplusDenotion').html("<span style=\"color: Gold;\"> x2</span>")
    }else if (DomainSurplus && Pottery) {$('#DomainSurplusDenotion').html("<span style=\"color: Gold;\"> x2.5</span>")
    }else {$('#DomainSurplusDenotion').html("")}
    if (InspirationSurplus && !(Pottery)) {$('#InspirationSurplusDenotion').html("<span style=\"color: Gold;\"> x2</span>")
    }else if (InspirationSurplus && Pottery) {$('#InspirationSurplusDenotion').html("<span style=\"color: Gold;\"> x2.5</span>")
    }else {$('#InspirationSurplusDenotion').html("")}
    if (GripSurplus  && !(Pottery)) {$('#GripSurplusDenotion').html("<span style=\"color: Gold;\"> x2</span>")
    }else if (GripSurplus && Pottery) {$('#GripSurplusDenotion').html("<span style=\"color: Gold;\"> x2.5</span>")
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
    if (FolkOfTheWindingFlowVictoryLevel >= VictoryLevelCap) {
        VictoryOrLossAchieved = true;
        $('#EndOfGameHeader').html("<span style=\"color: Red;\">DEFEAT</span>");
        $('#EndOfGameParagraph').html("The <span style=\"color: Aqua;\">Folk of the Winding Flow</span> have won the game via Influence");
        $('#DiscoveryVictory').hide();
        $('#SupremacyVictory').hide();
        $('#InfluenceVictory').show();
        
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
    $('#PurchaseUpgradeButton').hide();
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

$('#BeginEra').click(BeginEra);
function BeginEra() {
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
    
    $('#ShiningScalesRaid').fadeOut();
    $('#ShiningScalesBarter').fadeOut();
    $('#LongTalonTribeRaid').fadeOut();
    $('#LongTalonTribeBarter').fadeOut();
    $('#FolkOfTheWindingFlowRaid').fadeOut();
    $('#FolkOfTheWindingFlowBarter').fadeOut();
    
    CurrentSupremacy = CurrentSupremacy + ExpansionLevel;
    CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
    CalculateEraTensionIncrease();
    CalculateEraVictoryIncrease();

    RefreshPage();
}

function CalculateNewTribeMemberResult() {
    var UpkeepCost = Math.floor(CurrentPopulation/2)
    if (CurrentSupply - UpkeepCost >= 0) {
        $("#UpkeepResult").html(UpkeepCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was consumed for Upkeep.")
        DecrementSupply(UpkeepCost)
        
        if (CurrentPopulation < ((ExpansionLevel*7))) {
            SelectAndAddRandomNeededTribal();
            $('#NewTribeMemberResult').html("A new "+ SelectedRandomTribal +" is raised.")
        }else{$('#NewTribeMemberResult').html("")}  
    }else{
        $("#UpkeepResult").html(CurrentSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> was consumed for Upkeep but it wasn't enough to stay hunger and the elements for all.")
        DecrementSupply(CurrentSupply)
         SelectAndRemoveSelectedRandomTribal();
        $('#NewTribeMemberResult').html("A "+ SelectedRandomTribal +" has died.")
    }
}

function CalculateEraTensionIncrease() {
    LongTalonTribeTension = LongTalonTribeTension + Math.floor((((ExpansionLevel) + (CurrentDiscovery) + (CultureLevel))/4) + (ExpansionLevel/2));
    ShiningScalesTension = ShiningScalesTension + Math.floor((((ExpansionLevel) + (CurrentDiscovery) + (CultureLevel))/4) + (CurrentDiscovery/2));
    FolkOfTheWindingFlowTension = FolkOfTheWindingFlowTension + Math.floor((((ExpansionLevel) + (CurrentDiscovery) + (CultureLevel))/4) + (CultureLevel/2));
    console.log("LongTalonTribeTension " + LongTalonTribeTension);
    console.log("ShiningScalesTension " + ShiningScalesTension);
    console.log("FolkOfTheWindingFlowTension " + FolkOfTheWindingFlowTension);
}


$('#HarvestContinueButton').click(ContinueToEvent);
function ContinueToEvent() {
    CurrentPhase = 2;
    if (VictoryOrLossAchieved) {CurrentPhase = 5}
    CalculateEvent();
    RefreshPage();
}

function ShowAllCompetition() {
    $('#ShiningScalesRaid').fadeIn();
    $('#ShiningScalesBarter').fadeIn();
    $('#LongTalonTribeRaid').fadeIn();
    $('#LongTalonTribeBarter').fadeIn();
    $('#FolkOfTheWindingFlowRaid').fadeIn();
    $('#FolkOfTheWindingFlowBarter').fadeIn();
}



//In depth Calculation for turns---------------------------------------------------
function CalculateHuntingResult() {
    var Calc = Math.floor(CurrentNumberOfHunters * HunterMultiplier);
    if (SupplySurplus && !(Pottery)) {Calc = Calc * 2
    }else if (SupplySurplus && Pottery) {Calc = Math.floor(Calc * 2.5)}
    if (Calc > 0) {
        $('#HunterResult').html("Your hunters return with " +Calc+ " <span style=\"color: rgb(178, 0, 0);\">Supply</span> for the tribe");
        IncrementSupply(Calc)
    }else{$('#HunterResult').html("");}
}

function CalculateCraftingResult() {
    var Calc = Math.floor(CurrentNumberOfCrafters * CrafterMultiplier);
    if (InspirationSurplus && !(Pottery)) {Calc = Calc * 2
    }else if (InspirationSurplus && Pottery) {Calc = Math.floor(Calc * 2.5)}
    if (Calc > 0) {
        $('#CrafterResult').html("Your crafters gained " +Calc+ " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> for your tribe");
        IncrementInspiration(Calc)
    }else{$('#CrafterResult').html("");}
}

function CalculateExploringResult() {
    var Calc = Math.floor(CurrentNumberOfExplorers * ExplorerMultiplier);
    if (DomainSurplus && !(Pottery)) {Calc = Calc * 2
    }else if (DomainSurplus && Pottery) {Calc = Math.floor(Calc * 2.5)}
    if (Calc > 0) {
        $('#ExplorerResult').html("Your explorers have expanded your tribe's territory by " +Calc+ " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
        IncrementDomain(Calc)
    }else{$('#ExplorerResult').html("");}
}

function CalculateWarResult() {
    var Calc = Math.floor(CurrentNumberOfWarriors * WarriorMultiplier);
    if (GripSurplus && !(Pottery)) {Calc = Calc * 2
    }else if (GripSurplus && Pottery) {Calc = Math.floor(Calc * 2.5)}
    if (Calc > 0) {
        $('#WarResult').html("Your warriors have secured your tribe's hold by " +Calc+ " <span style=\"color: grey;\">Grip</span>");
        IncrementGrip(Calc)
    }else{$('#WarriorResult').html("");}
}

function CalculateMapOfTheAncients() {
    if (MapOfTheAncients > 0) {
        $('#MapOfTheAncientsResult').html("Studying the Map of the Ancients grants you " +MapOfTheAncients+ " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
        IncrementDomain(MapOfTheAncients)
        MapOfTheAncients++
        if (MapOfTheAncients > 30) {MapOfTheAncients = 30}
    }
}

function CalculateAncientGarden() {
    if (AncientGarden > 0) {
        $('#AncientGardenResult').html("Food from the Ancient Garden grants you " +AncientGarden+ " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
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
        $('#PinnacleStoneResult').html("Living in the shadow of the Pinnacle Stone grants you " +PinnacleStone+ " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
        IncrementInspiration(PinnacleStone)
        PinnacleStone++
        if (PinnacleStone > 30) {PinnacleStone = 30}
    }
}

function CalculateSpearOfTheAncients() {
    if (SpearOfTheAncients > 0) {
        $('#SpearOfTheAncientsResult').html("Possessing the Spear of the Ancients grants you " +SpearOfTheAncients+ " <span style=\"color: grey;\">Grip</span>");
        IncrementGrip(SpearOfTheAncients)
        SpearOfTheAncients++
        if (SpearOfTheAncients > 30) {SpearOfTheAncients = 30}
    }
}

// Supply Upgrade Buttons-------------------------------------------------

$('#Population_Boom').click(function(){

    $('#UpgradeInfoBoxCost').html(TotalPopulationBoomCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Population Boom");
    $('#UpgradeInfoBoxDescription').html("A new tribe member will join your tribe immediately so long as you have the capacity.");
    
    PurchasedUpgradeLoadedUpgrade = 101;
    if (CurrentSupply >= TotalPopulationBoomCost && (CurrentPopulation < (ExpansionLevel*7))) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Boost_Inspiration').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalInspirationSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Inspiration");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> gain for one epoch. Limited to one surplus per type per epoch.");
    
    PurchasedUpgradeLoadedUpgrade = 102;
    if (CurrentSupply >= TotalInspirationSurplusCost && (InspirationSurplus == false)) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Boost_Domain').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalDomainSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Domain");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: rgb(207, 166, 0);\">Domain</span> gain for one epoch. Limited to one surplus per type per epoch.");
    
    PurchasedUpgradeLoadedUpgrade = 103;
    if (CurrentSupply >= TotalDomainSurplusCost && (DomainSurplus == false)) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Boost_Grip').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalGripSurplusCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#UpgradeInfoBoxHeader').html("Boost Grip");
    $('#UpgradeInfoBoxDescription').html("Gain a Surplus bonus that will increase your <span style=\"color: grey;\">Grip</span> gain for one epoch. Limited to one surplus per type per epoch.");
    
    PurchasedUpgradeLoadedUpgrade = 104;
    if (CurrentSupply >= TotalGripSurplusCost && (GripSurplus == false)) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

// Inspiration Upgrade Buttons -----------------------------------------------------------------------

$('#Improve_Hunting_Tools').click(function(){
    $('#UpgradeInfoBoxCost').html(HunterToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Hunting Tools");
    $('#UpgradeInfoBoxDescription').html("With improved hunting tools, your Tribe can hunt more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Efficiency of your Hunters by 0.5. \
                                         Your Supply bounty will be the product of your number of Hunters and your Hunting Efficiency.</span>");
    
    PurchasedUpgradeLoadedUpgrade = 201;
    if (CurrentInspiration >= HunterToolInspirationCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Improve_Crafting_Tools').click(function(){
    $('#UpgradeInfoBoxCost').html(CrafterToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Crafting Tools");
    $('#UpgradeInfoBoxDescription').html("With improved crafting tools, your Tribe can craft more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Crafters by 0.5. \
                                         Your Inspiration bounty will be the product of your number of Crafters and your Crafting Efficiency.</span>");
    
    PurchasedUpgradeLoadedUpgrade = 202;
    if (CurrentInspiration >= CrafterToolInspirationCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Improve_Exploring_Tools').click(function(){
    $('#UpgradeInfoBoxCost').html(ExplorerToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve Exploring Tools");
    $('#UpgradeInfoBoxDescription').html("With improved exploring tools, your Tribe can explore more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Explorers by 0.5. \
                                         Your Domain bounty will be the product of your number of Explorers and your Exploring Efficiency.</span>");
    
    PurchasedUpgradeLoadedUpgrade = 203;
    if (CurrentInspiration >= ExplorerToolInspirationCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Improve_War_Tools').click(function(){
    $('#UpgradeInfoBoxCost').html(WarriorToolInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Improve War Tools");
    $('#UpgradeInfoBoxDescription').html("With improved war tools, your Tribe can maintain its grip on the its assets more efficiently.\
                                         <br/><span class=\"OOC\">This upgrade will increase the Effieciency of your Warriors by 0.5. \
                                         Your Grip bounty will be the product of your number of Warriors and your War Efficiency.</span>");
    
    PurchasedUpgradeLoadedUpgrade = 204;
    if (CurrentInspiration >= WarriorToolInspirationCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Improve_Culture').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalCultureInspirationCost + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#UpgradeInfoBoxHeader').html("Cultural Innovation");
    $('#UpgradeInfoBoxDescription').html("Advancing in art and sophistication, your tribe begins to leave its mark on the surrounding land and peoples.\
                                         <br/><span class=\"OOC\">This upgrade will increase your culture. Each Era, your culture will be added to your Influence. Higher Culture will give larger returns when Bartering</span>");
    
    PurchasedUpgradeLoadedUpgrade = 211;
    if (CurrentInspiration >= TotalCultureInspirationCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})


// Domain Expansion Upgrades----------------------------------------

$('#River_Expansion').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("River Expansion");
    $('#UpgradeInfoBoxDescription').html("River regions provide a great source of food and are a good portal to new territory.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition. \
                                         But, it will increase your population over time.<br/> \
                                         3 more Hunters <br/> \
                                         2 more Explorers <br/> \
                                         1 more Crafter <br/> \
                                         1 more Warrior <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 301;
    if (CurrentDomain >= TotalExpansionDomainCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Forest_Expansion').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Forest Expansion");
    $('#UpgradeInfoBoxDescription').html("Forest regions provide a great source of wonder and are difficult to encroach upon.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition. \
                                         But, it will increase your population over time.<br/> \
                                         1 more Hunter <br/> \
                                         1 more Explorer <br/> \
                                         3 more Crafters <br/> \
                                         2 more Warriors <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 302;
    if (CurrentDomain >= TotalExpansionDomainCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Savanna_Expansion').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Savanna Expansion");
    $('#UpgradeInfoBoxDescription').html("Savannas are a great portal to new horizons and host a good deal of wildlife.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition. \
                                         But, it will increase your population over time.<br/> \
                                         2 more Hunters <br/> \
                                         3 more Explorers <br/> \
                                         1 more Crafter <br/> \
                                         1 more Warrior <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 303;
    if (CurrentDomain >= TotalExpansionDomainCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#Hill_Expansion').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Hill Expansion");
    $('#UpgradeInfoBoxDescription').html("Hill regions are the most easily defensable and provide great seclusion for craft.\
                                         <br/><span class=\"OOC\">This expansion will increase the Tension between you and your competition. \
                                         But, it will increase your population over time.<br/> \
                                         1 more Hunter <br/> \
                                         1 more Explorer <br/> \
                                         2 more Crafters <br/> \
                                         3 more Warriors <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 304;
    if (CurrentDomain >= TotalExpansionDomainCost) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

// Beginning of Game Intro Logic -------------------------------------------------------------------

$('#River_Expansion_Intro').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("River Region");
    $('#UpgradeInfoBoxDescription').html("River regions provide a great source of food and are a good portal to new territory.\
                                         <br/><span class=\"OOC\">Starting here will give your tribe room to grow to the following limits:<br/> \
                                         3 Hunters <br/> \
                                         2 Explorers <br/> \
                                         1 Crafter <br/> \
                                         1 Warrior <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 991;
    $('#PurchaseUpgradeButton').show()
})

$('#Forest_Expansion_Intro').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Forest Region");
    $('#UpgradeInfoBoxDescription').html("Forest regions provide a great source of wonder and are difficult to encroach upon.\
                                         <br/><span class=\"OOC\">Starting here will give your tribe room to grow to the following limits:<br/> \
                                         1 Hunter <br/> \
                                         1 Explorer <br/> \
                                         3 Crafters <br/> \
                                         2 Warriors <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 992;
    $('#PurchaseUpgradeButton').show()
})

$('#Savanna_Expansion_Intro').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Savanna Region");
    $('#UpgradeInfoBoxDescription').html("Savannas are a great portal to new horizons and host a good deal of wildlife.\
                                         <br/><span class=\"OOC\">Starting here will give your tribe room to grow to the following limits:<br/> \
                                         2 Hunters <br/> \
                                         3 Explorers <br/> \
                                         1 Crafter <br/> \
                                         1 Warrior <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 993;
    $('#PurchaseUpgradeButton').show()
})

$('#Hill_Expansion_Intro').click(function(){
    $('#UpgradeInfoBoxCost').html(TotalExpansionDomainCost + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#UpgradeInfoBoxHeader').html("Hill Region");
    $('#UpgradeInfoBoxDescription').html("Hill regions are the most easily defensable and provide great seclusion for craft.\
                                         <br/><span class=\"OOC\">Starting here will give your tribe room to grow to the following limits:<br/> \
                                         1 Hunter <br/> \
                                         1 Explorer <br/> \
                                         2 Crafters <br/> \
                                         3 Warriors <br/> \</span>");
    
    PurchasedUpgradeLoadedUpgrade = 994;
    $('#PurchaseUpgradeButton').show()
})

// Purchasing Upgrades Logic-------------------------------------------------------------------------

$('#PurchaseUpgradeButton').click(function(){  

    $('#PurchaseUpgradeButton').hide();
   
   switch (PurchasedUpgradeLoadedUpgrade) {
    case 101:
        P_Population_Boom()
        break;
    case 102:
        P_Boost_Inspiration()
        break;
    case 103:
        P_Boost_Domain()
        break;
    case 104:
        P_Boost_Grip()
        break;
    //Innovations
    case 201:
        P_Improve_Hunting_Tools()
        break;
    case 202:
        P_Improve_Crafting_Tools()
        break;
    case 203:
        P_Improve_Exploring_Tools()
        break;
    case 204:
        P_Improve_War_Tools()
        break;
    case 211:
        P_Improve_Culture()
        break;
    //Expansions
    case 301:
        P_River_Expansion()
        break;
    case 302:
        P_Forest_Expansion()
        break;
    case 303:
        P_Savanna_Expansion()
        break;
    case 304:
        P_Hill_Expansion()
        break;
    case 401:
        P_RaidShiningScales()
        break;
    case 402:
        P_BarterShiningScales()
        break;
    case 403:
        P_RaidLongTalonTribe()
        break;
    case 404:
        P_BarterLongTalonTribe()
        break;
    case 405:
        P_RaidFolkOfTheWindingFlow()
        break;
    case 406:
        P_BarterFolkOfTheWindingFlow()
        break;
    case 991:
        P_River_Expansion()
        ShowAllCompetition()
        ContinueToBegin()
        break;
    case 992:
        P_Forest_Expansion()
        ShowAllCompetition()
        ContinueToBegin()
        break;
    case 993:
        P_Savanna_Expansion()
        ShowAllCompetition()
        ContinueToBegin() 
        break;
    case 994:
        P_Hill_Expansion()
        ShowAllCompetition()
        ContinueToBegin() 
        break; 
    
    default:
        alert("Ya done broke it.  PurchaseUpgradeButton")
   }    
    RefreshPage();
});

function P_Population_Boom(){
    DecrementSupply(TotalPopulationBoomCost);
    SelectAndAddRandomNeededTribal();
    
}

function P_Boost_Inspiration(){
    DecrementSupply(TotalInspirationSurplusCost);
    InspirationSurplus = true
}

function P_Boost_Domain(){
    DecrementSupply(TotalDomainSurplusCost);
    DomainSurplus = true
}

function P_Boost_Grip(){
    DecrementSupply(TotalGripSurplusCost);
    GripSurplus = true
}

//---------------------------------
function P_Improve_Hunting_Tools(){
    DecrementInspiration(HunterToolInspirationCost);    
    ImprovedToolsLevel++
    HunterMultiplier = HunterMultiplier + 0.5
}

function P_Improve_Crafting_Tools(){
    DecrementInspiration(CrafterToolInspirationCost);    
    ImprovedToolsLevel++
    CrafterMultiplier = CrafterMultiplier + 0.5
}

function P_Improve_Exploring_Tools(){
    DecrementInspiration(ExplorerToolInspirationCost);    
    ImprovedToolsLevel++
    ExplorerMultiplier = ExplorerMultiplier + 0.5
}

function P_Improve_War_Tools(){
    DecrementInspiration(WarriorToolInspirationCost);    
    ImprovedToolsLevel++
    WarriorMultiplier = WarriorMultiplier + 0.5
}

function P_Improve_Culture(){
    DecrementInspiration(TotalCultureInspirationCost);    
    CultureLevel++
}
//----------------------------
function P_River_Expansion(){
    DecrementDomain(TotalExpansionDomainCost);    
    NumberOfRiverExpansions++
    HunterExpansionBonus = HunterExpansionBonus + 3
    CrafterExpansionBonus = CrafterExpansionBonus + 1
    ExplorerExpansionBonus = ExplorerExpansionBonus + 2
    WarriorExpansionBonus = WarriorExpansionBonus + 1
}

function P_Forest_Expansion(){
    DecrementDomain(TotalExpansionDomainCost);    
    NumberOfForestExpansions++
    HunterExpansionBonus = HunterExpansionBonus + 1
    CrafterExpansionBonus = CrafterExpansionBonus + 3
    ExplorerExpansionBonus = ExplorerExpansionBonus + 1
    WarriorExpansionBonus = WarriorExpansionBonus + 2
}

function P_Savanna_Expansion(){
    DecrementDomain(TotalExpansionDomainCost);    
    NumberOfSavannaExpansions++
    HunterExpansionBonus = HunterExpansionBonus + 2
    CrafterExpansionBonus = CrafterExpansionBonus + 1
    ExplorerExpansionBonus = ExplorerExpansionBonus + 3
    WarriorExpansionBonus = WarriorExpansionBonus + 1
}

function P_Hill_Expansion(){
    DecrementDomain(TotalExpansionDomainCost);    
    NumberOfHillExpansions++
    HunterExpansionBonus = HunterExpansionBonus + 1
    CrafterExpansionBonus = CrafterExpansionBonus + 2
    ExplorerExpansionBonus = ExplorerExpansionBonus + 1
    WarriorExpansionBonus = WarriorExpansionBonus + 3
}


// Competition Logic ------------------------------------------------------------------------------------

$('#ActionContinueButton').click(ContinueToBegin); 
function ContinueToBegin() {
    CurrentPhase = 0;
    if (VictoryOrLossAchieved) {CurrentPhase = 5}
    RefreshPage();
}

$('#ShiningScalesRaid').click(function(){
    $('#UpgradeInfoBoxCost').html(RaidingCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Raid the Shining Scales</span>");
    $('#UpgradeInfoBoxDescription').html("Send a raiding party to aquire resources from their territory. This will increase the tension between your tribes, but slow their progress toward victory.");
    PurchasedUpgradeLoadedUpgrade = 401;
    if (CurrentGrip >= RaidingCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#ShiningScalesBarter').click(function(){
    $('#UpgradeInfoBoxCost').html(BarteringCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: DarkGoldenRod;\">Barter with the Shining Scales</span>");
    $('#UpgradeInfoBoxDescription').html("Send an entourage of warriors, traders, and diplomats to barter with them. This will decrease tension between your tribes and put you both closer to victory.");
    PurchasedUpgradeLoadedUpgrade = 402;
    if (CurrentGrip >= BarteringCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#ShiningScalesAbout').click(function(){
    $('#UpgradeInfoBoxCost').html("<br/>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>");
    $('#UpgradeInfoBoxDescription').html("A tribe claiming to have descended from the Ancients of this land, they are friendly enough to who they call newcomers,\
                                         but jealously work to find and protect 'their' relics.");
    $('#PurchaseUpgradeButton').hide();
})

$('#LongTalonTribeRaid').click(function(){
    $('#UpgradeInfoBoxCost').html(RaidingCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: OrangeRed;\">Raid the Long Talon Tribe</span>");
    $('#UpgradeInfoBoxDescription').html("Send a raiding party to aquire resources from their territory. This will increase the tension between your tribes, but slow their progress toward victory."); 
    PurchasedUpgradeLoadedUpgrade = 403;
    if (CurrentGrip >= RaidingCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#LongTalonTribeBarter').click(function(){
    $('#UpgradeInfoBoxCost').html(BarteringCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: OrangeRed;\">Barter with the Long Talon Tribe</span>");
    $('#UpgradeInfoBoxDescription').html("Send an entourage of warriors, traders, and diplomats to barter with them. This will decrease tension between your tribes and put you both closer to victory.");
    PurchasedUpgradeLoadedUpgrade = 404;    
    if (CurrentGrip >= BarteringCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}

})

$('#LongTalonTribeAbout').click(function(){
    $('#UpgradeInfoBoxCost').html("<br/>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: OrangeRed;\">The Long Talon Tribe</span>");
    $('#UpgradeInfoBoxDescription').html("The Long Talons favor military prowess. They also excel in it. The more impressive the target, the more likely they are to strike.\
                                         In this way, they assure none grow too large to handle.");
    $('#PurchaseUpgradeButton').hide();
})

$('#FolkOfTheWindingFlowRaid').click(function(){
    $('#UpgradeInfoBoxCost').html(RaidingCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: Aqua;\">Raid the Folk of the Winding Flow</span>");
    $('#UpgradeInfoBoxDescription').html("Send a raiding party to aquire resources from their territory. This will increase the tension between your tribes, but slow their progress toward victory.");
    PurchasedUpgradeLoadedUpgrade = 405;
    if (CurrentGrip >= RaidingCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#FolkOfTheWindingFlowBarter').click(function(){
    $('#UpgradeInfoBoxCost').html(BarteringCost + " <span style=\"color: grey;\">Grip</span>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: Aqua;\">Barter with the Folk of the Winding Flow</span>");
    $('#UpgradeInfoBoxDescription').html("Send an entourage of warriors, traders, and diplomats to barter with them. This will decrease tension between your tribes and put you both closer to victory.");
    PurchasedUpgradeLoadedUpgrade = 406;
    if (CurrentGrip >= BarteringCost && CurrentNumberOfWarriors > 0) {$('#PurchaseUpgradeButton').show();}
    else{$('#PurchaseUpgradeButton').hide();}
})

$('#FolkOfTheWindingFlowAbout').click(function(){
    $('#UpgradeInfoBoxCost').html("<br/>");
    $('#UpgradeInfoBoxHeader').html("<span style=\"color: Aqua;\">The Folk of the Winding Flow</span>");
    $('#UpgradeInfoBoxDescription').html("The Folk of the Winding Flow are a cultured and artistic tribe. They are relatively peaceful, more interested in spreading their ideas than their bloodline.");
    $('#PurchaseUpgradeButton').hide();
})

function P_RaidShiningScales() {
    CurrentPhase = 4;
    
    var WarriorsLost = ""
    var NumberOfWarriorsLost = Math.floor(((Math.random() * (CurrentNumberOfWarriors/2))))
    if (NumberOfWarriorsLost > 0) {
        if (NumberOfWarriorsLost > Math.floor(CurrentNumberOfWarriors/3)) {NumberOfWarriorsLost = Math.floor(CurrentNumberOfWarriors/3)}
        CurrentNumberOfWarriors = CurrentNumberOfWarriors - NumberOfWarriorsLost;
        if (NumberOfWarriorsLost > 1) {WarriorsLost = (NumberOfWarriorsLost + " warriors died during the raid")}
        else if (NumberOfWarriorsLost == 1) {WarriorsLost  = ("1 of your warriors died during the raid")}        
    }
    
    ShiningScalesTension = ShiningScalesTension + 8
    ShiningScalesVictoryLevel = ShiningScalesVictoryLevel = 4
    if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0};
    DecrementGrip(RaidingCost);
    var WarriorEffectiveness = CurrentNumberOfWarriors    
    if (ImprovedWarTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)}
    var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 1) + 1))
    var GainedInspiration = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1))
    var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1))
       
    $('#RaidBarterResult').html("Your warriors return from raiding the <span style=\"color: DarkGoldenRod;\">Shining Scales</span> with the following: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>" + WarriorsLost + "<br/>This raid will slow their progress, but the tension between your tribes increases.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentSupremacy = CurrentSupremacy + (WarriorEffectiveness * ExpansionLevel);
    
    $('#ShiningScalesRaid').fadeOut();
    $('#LongTalonTribeRaid').fadeOut();
    $('#FolkOfTheWindingFlowRaid').fadeOut();
    $('#ShiningScalesBarter').fadeOut();
}

function P_BarterShiningScales() {
    CurrentPhase = 4;
    ShiningScalesTension--
    ShiningScalesTension--
    ShiningScalesVictoryLevel++
    ShiningScalesVictoryLevel++
    if (ShiningScalesTension < 0) {ShiningScalesTension = 0};
    DecrementGrip(BarteringCost); 
    var GainedSupply = Math.floor((CultureLevel/2) * ((Math.random() * 1) + 1))
    var GainedInspiration = Math.floor((CultureLevel/2) * ((Math.random() * 2) + 1))
    var GainedDomain = Math.floor((CultureLevel/2) * ((Math.random() * 3) + 1))
    $('#RaidBarterResult').html("Your diplomats return with some gains after a season of bartering with the <span style=\"color: DarkGoldenRod;\">Shining Scales</span>: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>Relations have improved between your tribes as you both progress toward your goals through cooperation.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
    
    $('#ShiningScalesRaid').fadeOut();
    $('#LongTalonTribeBarter').fadeOut();
    $('#FolkOfTheWindingFlowBarter').fadeOut();    
    $('#ShiningScalesBarter').fadeOut();
}


function P_RaidLongTalonTribe() {
    CurrentPhase = 4;
    
    var WarriorsLost = ""
    var NumberOfWarriorsLost = Math.floor(((Math.random() * (CurrentNumberOfWarriors/2))))
    if (NumberOfWarriorsLost > 0) {
        if (NumberOfWarriorsLost > Math.floor(CurrentNumberOfWarriors/3)) {NumberOfWarriorsLost = Math.floor(CurrentNumberOfWarriors/3)}
        CurrentNumberOfWarriors = CurrentNumberOfWarriors - NumberOfWarriorsLost;
        if (NumberOfWarriorsLost > 1) {WarriorsLost  = (NumberOfWarriorsLost + " warriors died during the raid")}
        else if (NumberOfWarriorsLost == 1) {WarriorsLost  = ("1 of your warriors died during the raid")}        
    }
    
    LongTalonTribeTension = LongTalonTribeTension + 8
    LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - 4
    if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0};
    DecrementGrip(RaidingCost);
    
    var WarriorEffectiveness = CurrentNumberOfWarriors    
    if (ImprovedWarTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)}
    var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1))
    var GainedInspiration = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 1) + 1))
    var GainedDomain = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1))
 
    
    $('#RaidBarterResult').html("Your warriors return from raiding the Long Talon Tribe with the following: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>" + WarriorsLost + "<br/>This raid will slow their progress, but the tension between your tribes increases.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentSupremacy = CurrentSupremacy + (CurrentNumberOfWarriors * ExpansionLevel);
    
    $('#ShiningScalesRaid').fadeOut();
    $('#LongTalonTribeRaid').fadeOut();
    $('#FolkOfTheWindingFlowRaid').fadeOut();
    $('#LongTalonTribeBarter').fadeOut();
}

function P_BarterLongTalonTribe() {
    CurrentPhase = 4;
    LongTalonTribeTension--
    LongTalonTribeTension--
    LongTalonTribeVictoryLevel++
    LongTalonTribeVictoryLevel++
    if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0};
    DecrementGrip(BarteringCost); 
    var GainedSupply = Math.floor((CultureLevel/2) * ((Math.random() * 3) + 1))
    var GainedInspiration = Math.floor((CultureLevel/2) * ((Math.random() * 2) + 1))
    var GainedDomain = Math.floor((CultureLevel/2) * ((Math.random() * 1) + 1))
    $('#RaidBarterResult').html("Your diplomats return with some gains after a season of bartering with the <span style=\"color: OrangeRed;\">Long Talon Tribe</span>: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>Relations have improved between your tribes as you both progress toward your goals through cooperation.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
    
    $('#LongTalonTribeRaid').fadeOut();
    $('#LongTalonTribeBarter').fadeOut();
    $('#FolkOfTheWindingFlowBarter').fadeOut();    
    $('#ShiningScalesBarter').fadeOut();
}

function P_RaidFolkOfTheWindingFlow() {
    CurrentPhase = 4;
    
    var WarriorsLost = ""
    var NumberOfWarriorsLost = Math.floor(((Math.random() * (CurrentNumberOfWarriors/2))))
    if (NumberOfWarriorsLost > 0) {
        if (NumberOfWarriorsLost > Math.floor(CurrentNumberOfWarriors/3)) {NumberOfWarriorsLost = Math.floor(CurrentNumberOfWarriors/3)}
        CurrentNumberOfWarriors = CurrentNumberOfWarriors - NumberOfWarriorsLost;
        if (NumberOfWarriorsLost > 1) {WarriorsLost  = (NumberOfWarriorsLost + " warriors died during the raid")}
        else if (NumberOfWarriorsLost == 1) {WarriorsLost  = ("1 of your warriors died during the raid")} 
    }
    
    FolkOfTheWindingFlowTension = FolkOfTheWindingFlowTension + 8
    FolkOfTheWindingFlowVictoryLevel = FolkOfTheWindingFlowVictoryLevel - 4
    if (FolkOfTheWindingFlowVictoryLevel < 0) {FolkOfTheWindingFlowVictoryLevel = 0};
    DecrementGrip(RaidingCost);
    
    var WarriorEffectiveness = CurrentNumberOfWarriors    
    if (ImprovedWarTactics) {WarriorEffectiveness = Math.floor(WarriorEffectiveness * 1.5)}
    
    var GainedSupply = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 2) + 1))
    var GainedInspiration = Math.floor((WarriorEffectiveness/2) * ((Math.random() * 3) + 1))
    var GainedDomain = Math.floor((WarriorEffectiveness/2)* ((Math.random() * 2) + 1))
        
    $('#RaidBarterResult').html("Your warriors return from raiding the <span style=\"color: Aqua;\">Folk of the Winding Flow</span> with the following: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>" + WarriorsLost + "<br/>This raid will slow their progress, but the tension between your tribes increases.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentSupremacy = CurrentSupremacy + (WarriorEffectiveness * ExpansionLevel);
    
    $('#ShiningScalesRaid').fadeOut();
    $('#LongTalonTribeRaid').fadeOut();
    $('#FolkOfTheWindingFlowRaid').fadeOut();
    $('#FolkOfTheWindingFlowBarter').fadeOut();

}

function P_BarterFolkOfTheWindingFlow() {
    CurrentPhase = 4;
    FolkOfTheWindingFlowTension--
    FolkOfTheWindingFlowTension--
    FolkOfTheWindingFlowVictoryLevel++
    FolkOfTheWindingFlowVictoryLevel++
    if (FolkOfTheWindingFlowTension < 0) {FolkOfTheWindingFlowTension = 0};
    DecrementGrip(BarteringCost); 
    var GainedSupply = Math.floor((CultureLevel/2) * ((Math.random() * 2) + 1))
    var GainedInspiration = Math.floor((CultureLevel/2) * ((Math.random() * 3) + 1))
    var GainedDomain = Math.floor((CultureLevel/2) * ((Math.random() * 1) + 1))
    $('#RaidBarterResult').html("Your diplomats return with some gains after a season of bartering with the <span style=\"color: Aqua;\">Folk of the Winding Flow</span>: \
                                <br/>" + GainedSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                                <br/>" + GainedInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                                <br/>" + GainedDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>\
                                <br/>Relations have improved between your tribes as you both progress toward your goals through cooperation.");
    
    IncrementSupply(GainedSupply);
    IncrementInspiration(GainedInspiration);
    IncrementDomain(GainedDomain);
    CurrentInfluence = CurrentInfluence + (CultureLevel * ExpansionLevel);
    
    $('#FolkOfTheWindingFlowRaid').fadeOut();
    $('#LongTalonTribeBarter').fadeOut();
    $('#FolkOfTheWindingFlowBarter').fadeOut();    
    $('#ShiningScalesBarter').fadeOut();

}

// Events Logic --------------------------------------------------------------------------------------

function CalculateEvent() {
    RefreshEvent();
    var NeedToFindEvent = true;
    
    var RandomRaid = Math.floor((Math.random() * 3) + 1);
    switch (RandomRaid) {
        case 1:
            var D20 = Math.floor((Math.random() * 20) + 1);
            D20 = D20 + LongTalonTribeTension
            if (D20 > TensionCap) {
               CalculateLongTalonTribeRaided();
               NeedToFindEvent= false;
            }                          
            break;
        case 2:
            var D20 = Math.floor((Math.random() * 20) + 1);
            D20 = D20 + ShiningScalesTension
            if (D20 > TensionCap) {
                CalculateShiningScalesRaided();
                NeedToFindEvent= false;
            }                          
            break;
        case 3:
            var D20 = Math.floor((Math.random() * 20) + 1);
            D20 = D20 + FolkOfTheWindingFlowTension
            if (D20 > TensionCap) {
                CalculateFolkOfTheWindingFlowRaided();
                NeedToFindEvent= false;
            }                          
            break; 
    }
    
    
    var attempts = 0;
    while (attempts < ExpansionLevel && NeedToFindEvent) {
        attempts++
        var CategoryRandom = Math.floor((Math.random() * 3) + 1);
        if (CategoryRandom == 1) // Expansion Event
        {
            var EnvironmentEvent = Math.floor((Math.random() * 4) + 1);
            switch (EnvironmentEvent) {
            case 1:
                var RandomRiver = Math.floor((Math.random() * 2) + 1);
                switch (RandomRiver) {
                case 1:
                    if (NumberOfRiverExpansions > 0 && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        D10 = D10 + Math.floor(NumberOfRiverExpansions / 2)
                        if (D10 > 4) {
                            E_HostileWildlife();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                case 2:
                    if (NumberOfRiverExpansions > 0 && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        D10 = D10 + Math.floor(NumberOfRiverExpansions / 2)
                        if (D10 > 4) {
                            E_RisingWaters();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                }
                break;
            case 2:                
                if (NumberOfSavannaExpansions > 0 && NeedToFindEvent) {
                    var RandomSavanna = Math.floor((Math.random() * 2) + 1);
                    switch (RandomSavanna) {
                        case 1:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfSavannaExpansions / 2)
                            if (D10 > 4) {
                               E_WildStorms();
                               NeedToFindEvent= false;
                            }                          
                            break;
                        case 2:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfSavannaExpansions / 2)
                            if (D10 > 4) {
                                E_FavorableConditions();
                                NeedToFindEvent= false;
                            }                          
                            break;           
                    }
                }
                break;
            case 3:
                if (NumberOfForestExpansions > 0 && NeedToFindEvent) {
                    var RandomForest = Math.floor((Math.random() * 2) + 1);
                    switch (RandomForest) {
                        case 1:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfForestExpansions / 2)
                            if (D10 > 4) {
                                E_BrushFire();
                                NeedToFindEvent= false;
                            }
                            break;
                        case 2:
                            var D10 = Math.floor((Math.random() * 10) + 1);
                            D10 = D10 + Math.floor(NumberOfForestExpansions / 2)
                            if (D10 > 4) {
                                E_Visions();
                                NeedToFindEvent= false;
                            }
                            break;
                    }
                }
                break;
            case 4:
                if (NumberOfHillExpansions > 0 && NeedToFindEvent) {
                    var D10 = Math.floor((Math.random() * 10) + 1);
                    D10 = D10 + Math.floor(NumberOfHillExpansions / 2)
                    if (D10 > 4) {
                        E_Caverns();
                        NeedToFindEvent= false;
                    }
                }
                break;
            }
        }else if (CategoryRandom == 2) // Competition Event
        {
            var RelationsEvent = Math.floor((Math.random() * 5) + 1);    
            switch (RelationsEvent) {
                case 1:
                    if (CurrentSupply > 5 && CurrentInspiration > 5 && CurrentDomain > 5 && NeedToFindEvent) {
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
                    if ((CultureLevel > 3) && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_Recruitment();
                            NeedToFindEvent= false;
                        }
                    }
                    break;
                case 4:
                    if (CurrentSupply > 4 && NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_WaywardAndDesperate();
                            NeedToFindEvent= false;
                        }                   
                    }
                    break;
                case 5:
                    if(NeedToFindEvent) {
                        var D10 = Math.floor((Math.random() * 10) + 1);
                        if (D10 > 3) {
                            E_Alliance();
                            NeedToFindEvent= false;
                        }  
                    }
                    break;
            }
        }else if (CategoryRandom == 3) // Uncategorized Event
        {
            var UncategorizedEvent = Math.floor((Math.random() * 3) + 1);
            switch (UncategorizedEvent) {
                case 1:
                    if (CurrentDomain > (TotalDiscoveryDomainCost) && !(CurrentDiscovery == 5) && NeedToFindEvent) {
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
                    if (NeedToFindEvent && CurrentInspiration > TotalInventionInspirationCost) {
                       var RandomInvention = Math.floor((Math.random() * 2) + 1);
                       switch (RandomInvention) {
                           case 1:
                                if (!(Pottery)) {
                                    E_Pottery();
                                    NeedToFindEvent= false;
                                }
                            break;
                           case 2:
                                if (!(ImprovedWarTactics)) {
                                    E_ImprovedWarTactics();
                                    NeedToFindEvent= false;
                                }
                            break;
                       }
                   }else{E_InventionNotEnough(); NeedToFindEvent= false;}  
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
    case 103:
        EC_ImprovedWarTactics_InventImprovedWarTactics();
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
    case 301:
        EC_DemandTribute_GiveTribute();
        break;
    case 302:
        EC_ProposedTrade_Accept();
        break;
    case 303:
        EC_Recruitment_Recruit();
        break;
    case 304:
        EC_WaywardAndDesperate_Aid();
        break;
    case 305:
        EC_Alliance_Assist();
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
        ShowAllCompetition();
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
        ShowEventEnd();
        break;
    case 103:
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
    case 301:
        EC_DemandTribute_DenyTribute();
        break;
    case 302:
        EC_ProposedTrade_Deny();
        break;
    case 303:
        EC_Recruitment_TurnAway();
        break;
    case 304:
        ShowEventEnd();
        break;
    case 305:
        EC_Alliance_TurnAway();
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
    case 203:
        EC_HostileWildlife_Migrate();
        break;
    case 204:
        EC_BrushFire_StandYourGround();
        break;
    default:
        alert("Ya done broke it.  EventOption3")
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
}

function NonEvent() {
    $('#EventNar').html("There was a calm time of growth and reflection.");
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}
//Illness ---------------------------
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
    $('#EventOption1Description').html("Quarantine:<br/>Risk no further tribe members or resources by seperating the sick from the healthy. There is some chance you will lose more.");
    $('#EventOption1Button').show();
    if (CurrentSupply >= SupplyCost) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Treat:<br/> Spend " + SupplyCost + " <span style=\"color: rgb(178, 0, 0);\">Supply</span> to treat your sick and prevent further losses.");
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
    if (CurrentDomain >= NumberOfRiverExpansions*10) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Evacuate:<br/>Spend "+(NumberOfRiverExpansions*10)+" <span style=\"color: rgb(207, 166, 0);\">Domain</span>, but lose no time.");
        $('#EventOption1Button').show();
    }

    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Fortify:<br/>Spend time to fortify and redirect.");
    $('#EventOption2Button').show();
  
    EventLoadedValue = 202;
}

function EC_RisingWaters_Evacuate() {
    DecrementDomain(NumberOfRiverExpansions*10);
    RefreshEvent();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Rising Waters")    
    $('#EventNar').html("Your Tribe evacuates the riverlands for a time. <br/> You lost 10 <span style=\"color: rgb(207, 166, 0);\">Domain</span>.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_RisingWaters_Fortify() {
    PassXEras(NumberOfRiverExpansions);
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
        $('#EventOption1Description').html("Hunting Party:<br/>Risk losing hunters to gain extra <span style=\"color: rgb(178, 0, 0);\">Supply</span>.");
        $('#EventOption1Button').show();
    }
    if (CurrentInspiration > 9) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Outwit:<br/>Spend 10 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to end the threat.");
        $('#EventOption2Button').show();
    }
    if (CurrentDomain > 9) {
        $('#EventOption3Description').show();
        $('#EventOption3Description').html("Migrate:<br/>Lose 10 <span style=\"color: rgb(207, 166, 0);\">Domain</span> to end the threat.");
        $('#EventOption3Button').show();
    }

    EventLoadedValue = 203;
}

function EC_HostileWildlife_HuntingParty() {
    var HuntersLost = (Math.floor((Math.random() * CurrentNumberOfHunters) + 1)) - (HunterMultiplier);
    var ResultText = "";
    if (HuntersLost <= 0) {
        HuntersLost = 0;
        ResultText = "Your hunters return with no loses!"
    }else
    {
        ResultText = "The hunt proves tragic. " + HuntersLost + " of your Hunters has been killed."
    }
    CurrentNumberOfHunters = CurrentNumberOfHunters - HuntersLost;
    var Bounty = CurrentNumberOfHunters * 10
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

// Visions ------------------------------------

function E_Visions() {
    IncrementInspiration(20);
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Visions")
    $('#EventNar').html("A tribe member has happened upon flora along the trees that, upon injesting, drove him to great creative lengths. Your tribe gains 20 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>.");
    
    $('#EventOption1Button').show();
    EventLoadedValue = 999;
}

// Brush Fire -----------------------------------

function E_BrushFire() {    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")
    $('#EventNar').html("A brush fire has errupted nearby and is enchroaching on your domain.");
    if (CurrentDomain > 9) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Evacuate:<br/>Spend 10 <span style=\"color: rgb(207, 166, 0);\">Domain</span> to vacate the area.");
        $('#EventOption1Button').show();
    }
    if (CurrentInspiration > 9) {
        $('#EventOption2Description').show();
        $('#EventOption2Description').html("Protect:<br/>Spend 10 <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to protect your domain through enginuity.");
        $('#EventOption2Button').show();
    }
    $('#EventOption3Description').show();
    $('#EventOption3Description').html("Stand Your Ground:<br/>Risk the loss of your tribe members to stand your ground.");
    $('#EventOption3Button').show();
    
    EventLoadedValue = 204;
}

function EC_BrushFire_Evacuate() {
    DecrementDomain(10);
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")    
    $('#EventNar').html("Your tribe has vacated the territory for now, safely out of reach of the flames.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_BrushFire_Protect() {
    DecrementInspiration(10);
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Brush Fire")    
    $('#EventNar').html("Your tribe has formed a ring of scorched earth around your domain and stopped the wildfire's growth in your direction.");
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
    if (CurrentDomain > 9) {
        $('#EventOption1Description').show();
        $('#EventOption1Description').html("Explore:<br/>Spend 10 <span style=\"color: rgb(207, 166, 0);\">Domain</span> to settle the cave. This will reward you with some grip.");
        $('#EventOption1Button').show();
    }
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore:<br/>Carry on. You don't have the resources to investigate further.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 205;
}

function EC_Caverns_Explore() {
    DecrementDomain(10);
    GripEarned = (Math.floor((Math.random()*CurrentPopulation)+1)) * (NumberOfHillExpansions);
    IncrementGrip(GripEarned);
    RefreshEvent();
    RefreshPage();  
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Caverns")    
    $('#EventNar').html("Your explorers have settled and fortified the caverns. You've earned "+ GripEarned +  " <span style=\"color: grey;\">Grip</span>");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
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

// Pottery----------------------------------------

function E_InventionNotEnough(){
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention")
    $('#EventNar').html("With "+TotalInventionInspirationCost+" stashed <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>, your crafters might happen upon suprising innovations. For now, you are deficient in that resource.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
}

function E_Pottery() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention: Pottery")
    $('#EventNar').html("Your crafters claim they have found a way to work clay that will benefit the Tribe. Would you like them to pursue this innovation?");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Invent Pottery:<br/> spend "+TotalInventionInspirationCost+" <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to invent Pottery. This will improve the effectiveness on your Surplus.");
    $('#EventOption1Button').show();
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore this creative pursuit.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 102;
}

function EC_Pottery_InventPottery() {
    DecrementInspiration(TotalInventionInspirationCost);
    CurrentInfluence = CurrentInfluence + TotalInventionInspirationCost;
    Pottery = true;
    InventionLevel++;
    $('#Pottery').show();
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Invention: Pottery")    
    $('#EventNar').html("Your crafters invent Pottery! \
                        <br/>This will increase the bonus from Surplus. It has also increased your Influence significantly!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

$('#Pottery').click(function() {
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Pottery");
    $('#UpgradeInfoBoxDescription').html("Pottery, crafted from clay, more easily holds goods for transport and storage.\
                                         <br/><span class=\"OOC\">Increases the effectiveness of Surplus by 0.5.</span>");
    $('#PurchaseUpgradeButton').hide();
    
})

// Improved War Tactics ----------------------------------------

function E_ImprovedWarTactics() {
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Training: Improved War Tactics")
    $('#EventNar').html("New strategies have come about that might grow into a powerful tool for war. Would you like to pursue this innovation?");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Train in Improved War Tactics:<br/> spend "+TotalInventionInspirationCost+" <span style=\"color: rgb(36, 71, 178);\">Inspiration</span> to invent War Tactics. This will improve your effectiveness while raiding.");
    $('#EventOption1Button').show();
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Ignore this creative pursuit.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 103;
}

function EC_ImprovedWarTactics_InventImprovedWarTactics() {
    DecrementInspiration(TotalInventionInspirationCost);
    CurrentInfluence = CurrentInfluence + TotalInventionInspirationCost;
    ImprovedWarTactics = true;
    $('#War_Tactics').show();
    InventionLevel++;
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Train: Improved War Tactics")    
    $('#EventNar').html("Your have Invented Improved War Tactics! \
                        <br/>This will improve your effectiveness while raiding. It has also increased your Influence significantly!");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

$('#War_Tactics').click(function() {
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("War Tactics");
    $('#UpgradeInfoBoxDescription').html("Innovative minds have devised methods of war that grant an edge during raids.\
                                         <br/><span class=\"OOC\">Increases the effectiveness of your Warriors during raids by 0.5.</span>");
    $('#PurchaseUpgradeButton').hide();
    
})

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
        case 3:
            FolkOfTheWindingFlowTension--
            FolkOfTheWindingFlowTension--
            if (FolkOfTheWindingFlowTension < 0) {FolkOfTheWindingFlowTension = 0}
            FolkOfTheWindingFlowVictoryLevel++
            DemandedResource = Math.floor(CurrentInspiration / 4);
            DecrementInspiration(DemandedResource);
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
            LongTalonTribeVictoryLevel--
            break;
        case 2:
            ShiningScalesTension++
            ShiningScalesTension++
            ShiningScalesVictoryLevel--
            break;
        case 3:
            FolkOfTheWindingFlowTension++
            FolkOfTheWindingFlowTension++
            FolkOfTheWindingFlowVictoryLevel--
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
    var Quantity = 0;
    
    while (CombinationNotYetFound && Attempts < 10) {
        Attempts++
        SelectRandomResource();
        SelectSecondRandomResource();
        switch (SelectedRandomResourceValue) {
        case 1:
            Quantity = CurrentSupply;
            break;
        case 2:
            Quantity = CurrentDomain;
            break;
        case 3:
            Quantity = CurrentInspiration;
        }
        
        if (Quantity > CurrentEra) {
            CombinationNotYetFound = false
        }
    }    
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Trade Proposal")
    $('#EventNar').html(SelectedRandomRival + "  proposes a trade. How do you respond?");
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Accept Trade:<br/>Give " + SelectedRandomRival + " "+CurrentEra+" " + SelectedRandomResource + " and receive "+CurrentEra+" " + SelectedSecondRandomResource + " in return. \
                                    This will improve your relations");
    $('#EventOption1Button').show();

    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Deny Trade:<br/>Give nothing and gain nothing. This will Increase tension between your tribes.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 302;
}

function EC_ProposedTrade_Accept() {
    switch (SelectedRandomResourceValue) {
        case 1:
            DecrementSupply(CurrentEra);
            break;
        case 2:
            DecrementDomain(CurrentEra);
            break;
        case 3:
            DecrementInspiration(CurrentEra);
            break;
    }
    switch (SelectedSecondRandomResourceValue) {
        case 1:
            IncrementSupply(CurrentEra);
            break;
        case 2:
            IncrementDomain(CurrentEra);
            break;
        case 3:
            IncrementInspiration(CurrentEra);
            break;
    }
    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension--;
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            break;
        case 2:
            ShiningScalesTension--;
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            break;
        case 3:
            FolkOfTheWindingFlowTension--;
            if (FolkOfTheWindingFlowTension < 0) {FolkOfTheWindingFlowTension = 0}
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
        case 3:
            FolkOfTheWindingFlowTension++;
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

// Recruitment ----------------------------------

function E_Recruitment() {
    SelectRandomRival();
    SelectSelectedRandomTribal();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Recruitment")

    $('#EventNar').html("Thanks to your growing influence, a young "+SelectedRandomTribal+" is defecting from " + SelectedRandomRival + " and would like to join your tribe.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Recruit:<br/>\
                                    <br/>The "+SelectedRandomTribal+" is allowed to join your ranks. This will increase Tension between your tribes");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Turn Away:<br/>\
                                       <br/>This will keep tensions normal between your tribes.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 303;
}

function EC_Recruitment_Recruit() {
    switch (SelectedRandomTribalValue) {
        case 1:
            CurrentNumberOfHunters++
            break;
        case 2:
            CurrentNumberOfExplorers++
            break;
        case 3:
            CurrentNumberOfCrafters++
            break;
        case 4:
            CurrentNumberOfWarriors++
            break;
    }
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension++
            LongTalonTribeTension++
            break;
        case 2:
            ShiningScalesTension++
            ShiningScalesTension++
            break;
        case 3:
            FolkOfTheWindingFlowTension++
            FolkOfTheWindingFlowTension++
            break;
    }    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Recruitment")    
    $('#EventNar').html("You accept the recruit.\
                        <br/>This has increased tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

function EC_Recruitment_TurnAway() {
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Recruitment")    
    $('#EventNar').html("You turn the recruit away.\
                        <br/>" +SelectedRandomRival + " respect your decision.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}

// Wayward And Desperate -----------------------------------------------------------

function E_WaywardAndDesperate() {
    SelectRandomRival();
    SelectSelectedRandomTribal();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Wayward and Desperate")

    $('#EventNar').html("A wayward "+ SelectedRandomTribal +" of "+SelectedRandomRival+" is found lost and desperate.");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Aid:<br/>\
                                    <br/>The "+SelectedRandomTribal+" is to be fed and aided and sent on his way. This will cost 4 <span style=\"color: rgb(178, 0, 0);\">Supply</span> and decrease Tension between your tribes");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Abandon:<br/>\
                                       <br/>Spend no supply and leave them to their fate or put them out of their misery. The result will be the same. This will have no effect on your tribe.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 304;
}

function EC_WaywardAndDesperate_Aid() {
    DecrementSupply(4);    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension--;
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            break;
        case 2:
            ShiningScalesTension--;
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            break;
        case 3:
            FolkOfTheWindingFlowTension--;
            if (FolkOfTheWindingFlowTension < 0) {FolkOfTheWindingFlowTension = 0}
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
    var RewardAmount = (CurrentPopulation * 2)
    SelectRandomResource();
    SelectRandomRival();
    SelectSecondRandomRival();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")

    $('#EventNar').html(SelectedRandomRival + " is asking for your assistance in a conflict with " + SelectedSecondRandomRival + "\
                        For your aid, they are offering you " + RewardAmount + " " + SelectedRandomResource + ".");
    
    $('#EventOption1Description').show();
    $('#EventOption1Description').html("Assist:<br/>\
                                    <br/>Aid "+SelectedRandomRival+" in this endeavor. This will significantly reduce Tension between your tribes and move you both closer to victory\
                                    while increasing tension between you and " + SelectedSecondRandomRival + " and setting them back significantly.");
    $('#EventOption1Button').show();
    
    $('#EventOption2Description').show();
    $('#EventOption2Description').html("Turn Away:<br/>\
                                       <br/>This will increase Tension slightly between you and "+SelectedRandomRival+". Otherwise, you will remain unaffected.");
    $('#EventOption2Button').show();
    
    EventLoadedValue = 305;
    
}

function EC_Alliance_Assist() {
    var RewardAmount = (CurrentPopulation * 2)
    switch (SelectedRandomResourceValue) {
        case 1:
            IncrementSupply(RewardAmount);
            break;
        case 2:
            IncrementDomain(RewardAmount);
            break;
        case 3:
            IncrementInspiration(RewardAmount);
            break;
    }
    
    switch (SelectedRandomRivalValue) {
        case 1:
            LongTalonTribeTension = LongTalonTribeTension - 8;
            LongTalonTribeVictoryLevel++;
            if (LongTalonTribeTension < 0) {LongTalonTribeTension = 0}
            break;
        case 2:
            ShiningScalesTension = ShiningScalesTension - 8;
            ShiningScalesVictoryLevel++;
            if (ShiningScalesTension < 0) {ShiningScalesTension = 0}
            break;
        case 3:
            FolkOfTheWindingFlowTension = FolkOfTheWindingFlowTension - 8;
            FolkOfTheWindingFlowVictoryLevel++;            
            if (FolkOfTheWindingFlowTension < 0) {FolkOfTheWindingFlowTension = 0}
            break;
    }
    
    switch (SelectedSecondRandomRivalValue) {
        case 1:
            LongTalonTribeTension = LongTalonTribeTension + 4;
            LongTalonTribeVictoryLevel = LongTalonTribeVictoryLevel - 4;
            if (LongTalonTribeVictoryLevel < 0) {LongTalonTribeVictoryLevel = 0}
            break;
        case 2:
            ShiningScalesTension = ShiningScalesTension + 4;
            ShiningScalesVictoryLevel = ShiningScalesVictoryLevel - 4;
            if (ShiningScalesVictoryLevel < 0) {ShiningScalesVictoryLevel = 0}
            break;
        case 3:
            FolkOfTheWindingFlowTension = FolkOfTheWindingFlowTension + 4;
            FolkOfTheWindingFlowVictoryLevel = FolkOfTheWindingFlowVictoryLevel - 4;
            if (FolkOfTheWindingFlowVictoryLevel < 0) {FolkOfTheWindingFlowVictoryLevel = 0}
            break;
    }
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")   
    $('#EventNar').html("You assist the "+SelectedRandomRival+ ". \
                        They are greatful for your support. " +SelectedSecondRandomRival+ " less so.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
    
}

function EC_Alliance_TurnAway() {
 
    switch (SelectedRandomRivalValue) {
        case 1:
            ShiningScalesTension++;
            break;
        case 2:
            LongTalonTribeTension++;
            break;
        case 3:
            FolkOfTheWindingFlowTension++;
            break;
    }
    
    RefreshEvent();
    RefreshPage();
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Alliance")   
    $('#EventNar').html("You deny the "+SelectedRandomRival+ ". \
                        This has increased the tension between your tribes.");
    EventLoadedValue = 999;
    $('#EventOption1Button').show();
}


// Discovery Logic ---------------------------------------------------------------

function E_Discover() {
    if (MapOfTheAncients > 0 && AncientGarden > 0 && AncientCache > 0 && PinnacleStone > 0 && SpearOfTheAncients > 0) {return} 
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Dicovery")
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
    $('#EventResultBoxHeader').html("Dicovery")
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

$('#Map_Of_The_Ancients').click(function(){
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Map of the Ancients");
    $('#UpgradeInfoBoxDescription').html("A giant plate-like stone was uncovered from its shallow grave. On this stone, several symbols come together. \
                                         From an elevated perch nearby, the symbols make what clearly seem to be a map encompassing much of the surrounding area, \
                                         some known but much unknown to your tribe.\
                                         <br/><span class=\"OOC\"> At the start of each Era, gain some Domain. The amount gained increases each Era.The amount gained increases each Era. \
                                         <br/>Current gain: </span>" + (MapOfTheAncients) + " <span style=\"color: rgb(207, 166, 0);\">Domain</span>");
    $('#PurchaseUpgradeButton').hide();
})

$('#Ancient_Garden').click(function(){
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Ancient Garden");
    $('#UpgradeInfoBoxDescription').html("Your explorers have discovered a deeply hidden grove marked with the serpent symbol of those that came before. \
                                         Within the grove, fruits and berries grow in abundant quantity and to great size. So too do the beasts.\
                                         <br/><span class=\"OOC\"> At the start of each Era, gain some Supply. The amount gained increases each Era. \
                                         <br/>Current gain: </span>" + (AncientGarden) + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>");
    $('#PurchaseUpgradeButton').hide();
})

$('#Ancient_Cache').click(function(){
    var CalculatedBounty = Math.floor((AncientCache + 3)/ 3);
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Ancient Cache");
    $('#UpgradeInfoBoxDescription').html("A cave lined with stone carved serpent motif contains a cache of tools made with strange but effective designs and materials.\
                                         <br/><span class=\"OOC\"> At the start of each Era, gain some Overall. The amount gained increases each Era. \
                                         <br/>Current gain: </span>" + CalculatedBounty + " to each.");
    $('#PurchaseUpgradeButton').hide();
})

$('#Pinnacle_Stone').click(function(){
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Pinnacle Stone");
    $('#UpgradeInfoBoxDescription').html("The giant stone monolith at the pinnacle of this great expanse is, at a distance, a towering coiled serpent. \
                                         But, once the likewise coiling path is ascended and the monolith approached, its base contains pictographs \
                                         highlighting the life and ways of those who came before.\
                                         <br/><span class=\"OOC\"> At the start of each Era, gain some Inspiration. The amount gained increases each Era. \
                                         <br/>Current gain: </span>" + (PinnacleStone) + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>");
    $('#PurchaseUpgradeButton').hide();
})

$('#Spear_Of_The_Ancients').click(function(){
    $('#UpgradeInfoBoxCost').html("");
    $('#UpgradeInfoBoxHeader').html("Spear Of The Ancients");
    $('#UpgradeInfoBoxDescription').html("An alien spear is found lodged in the roots of an ancient tree. The shaft of the spear is appears wrapped \
                                         in serpents and the head shines like the sun. The weapon is found to best any match when tested.\
                                         <br/><span class=\"OOC\"> At the start of each Era, gain some Grip. The amount gained increases each Era. \
                                         <br/>Current gain: </span>" + (SpearOfTheAncients) + " <span style=\"color: grey;\">Grip</span>");
    $('#PurchaseUpgradeButton').hide();
})


//Competition-----------


function ShowEventEnd() {
    RefreshEvent();
    EventLoadedValue = 1000;
    $('#EventResultBoxHeader').show()
    $('#EventResultBoxHeader').html("Calm")    
    $('#EventNar').html("Your relationships with the neighboring tribes is calm for now. <br/>A new Era Begins.");        
    $('#EventOption1Button').show();
    RefreshPage();
}

function CalculateShiningScalesRaided() {
    ShiningScalesVictoryLevel++
    var LostSupply = 1 * ShiningScalesVictoryLevel;
    var LostInspiration = 2 * ShiningScalesVictoryLevel;
    var LostDomain = 3 * ShiningScalesVictoryLevel;
    var LostGrip = Math.floor(CurrentGrip/2);
    
    LostSupply = LostSupply - (LostGrip);
    LostInspiration = LostInspiration - (LostGrip);
    LostDomain = LostDomain - (LostGrip);
    
    if (LostSupply < 0) {LostSupply = 0}
    if (LostInspiration < 0) {LostInspiration = 0}
    if (LostDomain < 0) {LostDomain = 0}
    
    if (LostSupply > CurrentSupply) {LostSupply = CurrentSupply}
    if (LostInspiration > CurrentInspiration) {LostInspiration = CurrentInspiration}
    if (LostDomain > CurrentDomain) {LostDomain = CurrentDomain}
    
    DecrementGrip(LostGrip);
    
    DecrementSupply(LostSupply);
    DecrementInspiration(LostInspiration);
    DecrementDomain(LostDomain);
    
    var TribalsLost = "";
    if (ShiningScalesVictoryLevel < (VictoryLevelCap/4)) {
                //No Tribals Lost
    }else if (ShiningScalesVictoryLevel < (VictoryLevelCap/3)) {
        SelectAndRemoveSelectedRandomTribal();
        TribalsLost = "One of your tribe members was killed in the raid in addition to other losses.";
    }else if (ShiningScalesVictoryLevel < (VictoryLevelCap/2)) {
        SelectAndRemoveSelectedRandomTribal();        
        SelectAndRemoveSelectedRandomTribal();        
        TribalsLost = "<br/> Two of your Tribe members were killed in the Raid as well.";
    }else if (ShiningScalesVictoryLevel < (VictoryLevelCap/1.2)) {
        SelectAndRemoveSelectedRandomTribal();        
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        TribalsLost = "<br/> Several of your Tribe members were killed in the Raid as well.";
    }
    
    $('#EventNar').html("The <span style=\"color: DarkGoldenRod;\">Shining Scales</span> have Raided you! They managed to take or destroy the following: \
                            <br/>" + LostSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                            <br/>" + LostDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> \
                            <br/>" + LostInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                            <br/>" + LostGrip + " <span style=\"color: grey;\">Grip</span>\
                            <br/>" + TribalsLost);
    
    ShiningScalesTension = Math.floor((ShiningScalesTension / 3) + 1);
    RefreshPage();   
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
    
}

function CalculateLongTalonTribeRaided() {
    LongTalonTribeVictoryLevel++
    var LostSupply = 3 * LongTalonTribeVictoryLevel;
    var LostInspiration = 1 * LongTalonTribeVictoryLevel;
    var LostDomain = 2 * LongTalonTribeVictoryLevel;
    var LostGrip = Math.floor(CurrentGrip/2);
    
    LostSupply = LostSupply - (LostGrip);
    LostInspiration = LostInspiration - (LostGrip);
    LostDomain = LostDomain - (LostGrip);
    
    if (LostSupply < 0) {LostSupply = 0}
    if (LostInspiration < 0) {LostInspiration = 0}
    if (LostDomain < 0) {LostDomain = 0}
    
    if (LostSupply > CurrentSupply) {LostSupply = CurrentSupply}
    if (LostInspiration > CurrentInspiration) {LostInspiration = CurrentInspiration}
    if (LostDomain > CurrentDomain) {LostDomain = CurrentDomain}
    
    DecrementGrip(LostGrip);
    
    DecrementSupply(LostSupply);
    DecrementInspiration(LostInspiration);
    DecrementDomain(LostDomain);
    
    var TribalsLost = "";
    if (LongTalonTribeVictoryLevel < (VictoryLevelCap/4)) {
                //No Tribals Lost
    }else if (LongTalonTribeVictoryLevel < (VictoryLevelCap/3)) {
        SelectAndRemoveSelectedRandomTribal();
        TribalsLost = "One of your tribe members was killed in the raid in addition to other losses.";
    }else if (LongTalonTribeVictoryLevel < (VictoryLevelCap/2)) {
        SelectAndRemoveSelectedRandomTribal();
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}      
        TribalsLost = "<br/> Two of your Tribe members were killed in the Raid as well.";
    }else if (LongTalonTribeVictoryLevel < (VictoryLevelCap/1.2)) {
        SelectAndRemoveSelectedRandomTribal();        
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        TribalsLost = "<br/> Several of your Tribe members were killed in the Raid as well.";
    }
    
    $('#EventNar').html("The <span style=\"color: OrangeRed;\">Long Talon Tribe</span> has Raided you! They managed to take or destroy the following: \
                            <br/>" + LostSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                            <br/>" + LostDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> \
                            <br/>" + LostInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                            <br/>" + LostGrip + " <span style=\"color: grey;\">Grip</span>\
                            <br/>" + TribalsLost);
    
    LongTalonTribeTension = Math.floor((LongTalonTribeTension / 3) + 1);
    RefreshPage();   
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
}

function CalculateFolkOfTheWindingFlowRaided() {
    FolkOfTheWindingFlowVictoryLevel++
    var LostSupply = 2 * FolkOfTheWindingFlowVictoryLevel;
    var LostInspiration = 3 * FolkOfTheWindingFlowVictoryLevel;
    var LostDomain = 1 * FolkOfTheWindingFlowVictoryLevel;
    var LostGrip = Math.floor(CurrentGrip/2);
    
    LostSupply = LostSupply - (LostGrip);
    LostInspiration = LostInspiration - (LostGrip);
    LostDomain = LostDomain - (LostGrip);
    
    if (LostSupply < 0) {LostSupply = 0}
    if (LostInspiration < 0) {LostInspiration = 0}
    if (LostDomain < 0) {LostDomain = 0}
    
    if (LostSupply > CurrentSupply) {LostSupply = CurrentSupply}
    if (LostInspiration > CurrentInspiration) {LostInspiration = CurrentInspiration}
    if (LostDomain > CurrentDomain) {LostDomain = CurrentDomain}
    
    DecrementGrip(LostGrip);
    
    DecrementSupply(LostSupply);
    DecrementInspiration(LostInspiration);
    DecrementDomain(LostDomain);
    
    var TribalsLost = "";
    if (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap/4)) {
        //No Tribals Lost
    }else if (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap/3)) {
        SelectAndRemoveSelectedRandomTribal();
        TribalsLost = "One of your tribe members was killed in the raid in addition to other losses.";
    }else if (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap/2)) {
        SelectAndRemoveSelectedRandomTribal();
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        TribalsLost = "Two of your Tribe members were killed in the Raid as well.";
    }else if (FolkOfTheWindingFlowVictoryLevel < (VictoryLevelCap/1.2)) {
        SelectAndRemoveSelectedRandomTribal();     
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        if (CurrentNumberOfHunters+CurrentNumberOfExplorers+CurrentNumberOfCrafters+CurrentNumberOfWarriors > 0) {            
        SelectAndRemoveSelectedRandomTribal();}
        TribalsLost = "Several of your Tribe members were killed in the Raid as well.";
    }
        
    $('#EventNar').html("The <span style=\"color: Aqua;\">Folk of the Winding Flow</span> Raided you! They managed to take or destroy the following: \
                            <br/>" + LostSupply + " <span style=\"color: rgb(178, 0, 0);\">Supply</span>\
                            <br/>" + LostDomain + " <span style=\"color: rgb(207, 166, 0);\">Domain</span> \
                            <br/>" + LostInspiration + " <span style=\"color: rgb(36, 71, 178);\">Inspiration</span>\
                            <br/>" + LostGrip + " <span style=\"color: grey;\">Grip</span> \
                            <br/>" + TribalsLost);
    
    FolkOfTheWindingFlowTension = Math.floor((FolkOfTheWindingFlowTension / 3) + 1);
    RefreshPage();
    EventLoadedValue = 999;
    $('#EventOption1Button').show(); 
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
    if (CurrentPopulation < ((ExpansionLevel*7))) {
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

    var RandomNumber = Math.floor((Math.random()*3)+1)
    switch (RandomNumber) {
        case 1:
            SelectedRandomRival = "<span style=\"color: OrangeRed;\">The Long Talon Tribe</span>"
            SelectedRandomRivalValue = 1;
            break;
        case 2:
            SelectedRandomRival = "<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>"
            SelectedRandomRivalValue = 2;
            break;
        case 3:
            SelectedRandomRival = "<span style=\"color: Aqua;\">The Folk of the Winding Flow</span>"
            SelectedRandomRivalValue = 3;
            break;
    }
}

function SelectSecondRandomRival(){

    var RandomNumber = Math.floor((Math.random()*3)+1)
    switch (RandomNumber) {
        case 1:
            SelectedSecondRandomRival = "<span style=\"color: OrangeRed;\">The Long Talon Tribe</span>"
            SelectedSecondRandomRivalValue = 1;
            break;
        case 2:
            SelectedSecondRandomRival = "<span style=\"color: DarkGoldenRod;\">The Shining Scales</span>"
            SelectedSecondRandomRivalValue = 2;
            break;
        case 3:
            SelectedSecondRandomRival = "<span style=\"color: Aqua;\">The Folk of the Winding Flow</span>"
            SelectedSecondRandomRivalValue = 3;
            break;
    }
    
    if (SelectedSecondRandomRivalValue == SelectedRandomRivalValue) {SelectSecondRandomRival();}
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
    LongTalonTribeVictoryLevel++
    FolkOfTheWindingFlowVictoryLevel++
    console.log("LongTalonTribeVictoryLevel: " + LongTalonTribeVictoryLevel)
    console.log("ShiningScalesVictoryLevel: " + ShiningScalesVictoryLevel)
    console.log("FolkOfTheWindingFlowVictoryLevel: " + FolkOfTheWindingFlowVictoryLevel)
}

//Following Functions Increment Stashes------------------------------------------------------
function IncrementSupply(Inc) {CurrentSupply = CurrentSupply +Inc}
function IncrementInspiration(Inc) {CurrentInspiration = CurrentInspiration +Inc}
function IncrementDomain(Inc) {CurrentDomain = CurrentDomain +Inc}
function IncrementGrip(Inc) {CurrentGrip = CurrentGrip +Inc}

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

}
$(document).ready(main);
