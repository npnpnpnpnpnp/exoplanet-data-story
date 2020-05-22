library(jsonlite)
library(tidyverse)

# Data from PHL
phl <- read.csv("raw/phl_hec_all_confirmed.csv")
earth <- read.csv("raw/earth.csv")

phl_and_earth <- rbind(phl, earth)

phl_d <- phl_and_earth %>%
  select(P..Name,
         P..Radius..EU.,
         P..Mass..EU.,
         #P..Density..EU.,
         P..Gravity..EU.,
         P..Mean.Distance..AU.,
         #P..Esc.Vel..EU.,
         #P..SFlux.Mean..EU.,
         #P..Teq.Mean..K.,
         P..Ts.Mean..K.,
         #P..Mag,
         #P..Appar.Size..deg.,
         #P..Surf.Press..EU.,
         #P..Period..days.,
         #P..Sem.Major.Axis..AU.,
         #P..Inclination..deg.,
         #P..Atmosphere.Class,
         P..Disc..Method,
         S..Hab.Zone.Min..AU.,
         S..Hab.Zone.Max..AU.,
         #S..Mass..SU.,
         #S..Radius..SU.,
         #S..Luminosity..SU.,
         S..Distance..pc.,
         S..Teff..K.,
         #S..Age..Gyrs.,
         S..RA..hrs.,
         P..Mass.Class,
         #P..Habitable,
         #P..Confirmed,
         P..Disc..Year,
         #P..Habitable.Class,
         P..Composition.Class) %>%
  rename(pl_name=P..Name,
         pl_radius=P..Radius..EU.,
         pl_mass=P..Mass..EU.,
         # pl_density=P..Density..EU.,
         pl_gravity=P..Gravity..EU.,
         #pl_escapeVelocity=P..Esc.Vel..EU.,
         #pl_starFluxMean=P..SFlux.Mean..EU.,
         # pl_TeqMean=P..Teq.Mean..K.,
         pl_TsMean=P..Ts.Mean..K.,
         #pl_magnitude=P..Mag,
         # pl_apparentSize=P..Appar.Size..deg.,
         #pl_surfacePressure=P..Surf.Press..EU.,
         #pl_period=P..Period..days.,
         #pl_semiMajorAxis=P..Sem.Major.Axis..AU.,
         #pl_inclination=P..Inclination..deg.,
         pl_distance=P..Mean.Distance..AU.,
         pl_massClass=P..Mass.Class,
         #pl_habitable=P..Habitable,
         #pl_confirmed=P..Confirmed,
         #pl_atmosphereClass=P..Atmosphere.Class,
         pl_discMethod=P..Disc..Method,
         pl_discYear=P..Disc..Year,
         #pl_habitableClass=P..Habitable.Class,
         pl_compositionClass=P..Composition.Class,
         st_inner =S..Hab.Zone.Min..AU.,
         st_outer=S..Hab.Zone.Max..AU.,
         st_Teff=S..Teff..K.,
         # st_mass=S..Mass..SU.,
         #st_radius=S..Radius..SU.,
         #st_luminosity=S..Luminosity..SU.,
         st_distanceToSun=S..Distance..pc.,
         # st_age=S..Age..Gyrs.,
         st_rightAscension=S..RA..hrs.)

# Recode typos
phl_d$pl_discMethod <- phl_d$pl_discMethod %>% dplyr::recode_factor("radial velocity" = "Radial Velocity",
                                                                    "transit"="Transit",
                                                                    "Primary Transit"="Transit")

# Add boolean for conditional displays in the app
phl_d <- phl_d %>% mutate(pl_inCHZ = if_else(pl_distance > st_inner & pl_distance <st_outer, TRUE, FALSE))

# Add boolean for conditional displays in the app
phl_d <- phl_d %>% mutate(pl_inCHZAndRocky = if_else(pl_inCHZ==TRUE & pl_compositionClass=="rocky-iron" | pl_inCHZ==TRUE & pl_compositionClass=="rocky-water", TRUE, FALSE))

# Add boolean for conditional displays in the app
phl_d <- phl_d %>% mutate(pl_isHallOfFame = if_else(pl_name=="Proxima Cen b" 
                                                    | pl_name=="TRAPPIST-1 e"
                                                    | pl_name=="Kepler-1652 b"
                                                    | pl_name=="GJ 667 C c"
                                                    | pl_name=="Kepler-442 b"
                                                    | pl_name=="GJ 667 C f"
                                                    | pl_name=="Kepler-1229 b"
                                                    | pl_name=="TRAPPIST-1 f" 
                                                    | pl_name=="LHS 1140 b" 
                                                    | pl_name=="Kapteyn b" 
                                                    | pl_name=="Kepler-62 f" 
                                                    | pl_name=="Kepler-186 f" 
                                                    | pl_name=="GJ 667 C e"
                                                    | pl_name=="TRAPPIST-1 g",
                                                    TRUE, 
                                                    FALSE))



# Export as JSON
phl_json <- toJSON(phl_d, pretty=T, na="null")
write(phl_json, "tidy/phl.json")

# -------------------------------------------------
# Data from NASA
raw <- read.csv("raw/planets.csv", skip=358)
d <- raw %>% select(pl_name, pl_disc, pl_discmethod, pl_rade, pl_masse, st_dist, pl_orbper, st_jmk2, st_hmk2, st_optmag, pl_orbsmax, pl_kepflag, pl_k2flag, st_teff)

# Export as JSON
json <- toJSON(d, pretty=T, na="null")
write(json, "tidy/planets.json")


