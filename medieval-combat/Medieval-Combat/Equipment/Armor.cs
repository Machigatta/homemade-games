using Medieval_Combat.EnumDefinitions;
using Medieval_Combat.Constants;
using System;

namespace Medieval_Combat.Equipment
{
    internal class Armor
    {
        private int armorPoints;
        public int ArmorPoints
        {
            get
            {
                return armorPoints;
            }
        }

        public Armor(CombatTypes playerType)
        {
            switch (playerType)
            {
                case CombatTypes.Range:
                    armorPoints = CalcConstants.BASE_ARMOR * CalcConstants.RANGE_ARMOR_MULTI;
                    break;
                case CombatTypes.Meele:
                    armorPoints = CalcConstants.BASE_ARMOR * CalcConstants.MEELE_ARMOR_MULTI;
                    break;
                default:
                    break;
            }

            Console.WriteLine("# Damage-Reduction through Armor: {1}", armorPoints, armorPoints);
        }
    }
}