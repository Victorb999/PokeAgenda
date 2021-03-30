export interface Pokedex {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface HeldItem {
  item: Species;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: GenerationVi };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Crystal;
  silver: Crystal;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIii {
  emerald: Emerald;
  "firered-leafgreen": Crystal;
  "ruby-sapphire": Crystal;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface GenerationVi {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": GenerationVi;
}

export interface DreamWorld {
  front_default: string;
  front_female: string;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  "official-artwork": OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}
//============================
//especies====================
//============================

export interface PokeEspecies {
  baby_trigger_item: string;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  gender: string;
  held_item: string;
  item: string;
  known_move: string;
  known_move_type: string;
  location: string;
  min_affection: string;
  min_beauty: string;
  min_happiness: string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: string;
  party_type: string;
  relative_physical_stats: string;
  time_of_day: string;
  trade_species: string;
  trigger: Species;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}

//============================
//Moves====================
//============================

export interface PokeMoves {
  accuracy: number;
  contest_combos: ContestCombos;
  contest_effect: ContestEffect;
  contest_type: ContestType;
  damage_class: ContestType;
  effect_chance: string;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: ContestType;
  id: number;
  machines: any[];
  meta: Meta;
  name: string;
  names: NameM[];
  past_values: any[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: ContestEffect;
  target: ContestType;
  type: ContestType;
}

export interface ContestCombos {
  normal: Normal;
  super: Normal;
}

export interface Normal {
  use_after: string;
  use_before: ContestType[] | string;
}

export interface ContestType {
  name: string;
  url: string;
}

export interface ContestEffect {
  url: string;
}

export interface EffectEntry {
  effect: string;
  language: ContestType;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: ContestType;
  version_group: ContestType;
}

export interface Meta {
  ailment: ContestType;
  ailment_chance: number;
  category: ContestType;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: string;
  max_turns: string;
  min_hits: string;
  min_turns: string;
  stat_chance: number;
}

export interface NameM {
  language: ContestType;
  name: string;
}
//============================
//Ability====================
//============================
export interface PokeAbility {
  effect_changes: EffectChange[];
  effect_entries: PokeAbilityEffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: NameA[];
  pokemon: PokemonA[];
}

export interface EffectChange {
  effect_entries: EffectChangeEffectEntry[];
  version_group: Generation;
}

export interface EffectChangeEffectEntry {
  effect: string;
  language: Generation;
}

export interface Generation {
  name: string;
  url: string;
}

export interface PokeAbilityEffectEntry {
  effect: string;
  language: Generation;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Generation;
  version_group: Generation;
}

export interface NameA {
  language: Generation;
  name: string;
}

export interface PokemonA {
  is_hidden: boolean;
  pokemon: Generation;
  slot: number;
}
//============================
//Type====================
//============================
export interface PokeType {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: GenerationT;
  id: number;
  move_damage_class: GenerationT;
  moves: GenerationT[];
  name: string;
  names: NameT[];
  pokemon: PokemonT[];
}

export interface DamageRelations {
  double_damage_from: GenerationT[];
  double_damage_to: any[];
  half_damage_from: any[];
  half_damage_to: GenerationT[];
  no_damage_from: GenerationT[];
  no_damage_to: GenerationT[];
}

export interface GenerationT {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  generation: GenerationT;
}

export interface NameT {
  language: GenerationT;
  name: string;
}

export interface PokemonT {
  pokemon: GenerationT;
  slot: number;
}
//============================
//generation====================
//============================
export interface PokeGeneration {
  abilities: any[];
  id: number;
  main_region: MainRegion;
  moves: MainRegion[];
  name: string;
  names: NameG[];
  pokemon_species: MainRegion[];
  types: MainRegion[];
  version_groups: MainRegion[];
}

export interface MainRegion {
  name: string;
  url: string;
}

export interface NameG {
  language: MainRegion;
  name: string;
}
//============================
//pokemon-species=============
//============================
export interface PokemonSpecies {
  base_happiness:         number;
  capture_rate:           number;
  color:                  ColorS;
  egg_groups:             ColorS[];
  evolution_chain:        EvolutionChainS;
  evolves_from_species:   null;
  flavor_text_entries:    FlavorTextEntry[];
  form_descriptions:      any[];
  forms_switchable:       boolean;
  gender_rate:            number;
  genera:                 Genus[];
  generation:             ColorS;
  growth_rate:            ColorS;
  habitat:                ColorS;
  has_gender_differences: boolean;
  hatch_counter:          number;
  id:                     number;
  is_baby:                boolean;
  is_legendary:           boolean;
  is_mythical:            boolean;
  name:                   string;
  names:                  Name[];
  order:                  number;
  pal_park_encounters:    PalParkEncounterS[];
  pokedex_numbers:        PokedexNumberS[];
  shape:                  ColorS;
  varieties:              VarietyS[];
}

export interface ColorS {
  name: string;
  url:  string;
}

export interface EvolutionChainS {
  url: string;
}

export interface FlavorTextEntryS {
  flavor_text: string;
  language:    ColorS;
  version:     ColorS;
}

export interface Genus {
  genus:    string;
  language: ColorS;
}

export interface Name {
  language: ColorS;
  name:     string;
}

export interface PalParkEncounterS {
  area:       ColorS;
  base_score: number;
  rate:       number;
}

export interface PokedexNumberS {
  entry_number: number;
  pokedex:      ColorS;
}

export interface VarietyS {
  is_default: boolean;
  pokemon:    ColorS;
}

//============================
//Evolution CHAIN=============
//============================
export interface EvolutionChain {
  baby_trigger_item: null;
  chain:             ChainEC;
  id:                number;
}

export interface ChainEC {
  evolution_details: EvolutionDetailEC[];
  evolves_to:        ChainEC[];
  is_baby:           boolean;
  species:           Species;
}

export interface EvolutionDetailEC {
  gender:                  null;
  held_item:               null;
  item:                    null;
  known_move:              null;
  known_move_type:         null;
  location:                null;
  min_affection:           null;
  min_beauty:              null;
  min_happiness:           null;
  min_level:               number;
  needs_overworld_rain:    boolean;
  party_species:           null;
  party_type:              null;
  relative_physical_stats: null;
  time_of_day:             string;
  trade_species:           null;
  trigger:                 SpeciesEC;
  turn_upside_down:        boolean;
}

export interface SpeciesEC {
  name: string;
  url:  string;
}
