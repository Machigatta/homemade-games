using System;
using Medieval_Combat.EnumDefinitions;
using Medieval_Combat.Constants;

namespace Medieval_Combat.Equipment
{
    internal class Weapon
    {
        private int mDamage;
        public int MDamage
        {
            get
            {
                return mDamage;
            }
        }
        private int rDamage;
        public int RDamage
        {
            get
            {
                return rDamage;
            }
        }
        private MeeleWeaponTypes meeleWeapon;
        private RangeWeaponTypes rangeWeapon;


        public Weapon(CombatTypes player_Type)
        {
            Array mWeapons = Enum.GetValues(typeof(MeeleWeaponTypes));
            Random mRnd = new Random();
            meeleWeapon = (MeeleWeaponTypes)mWeapons.GetValue(mRnd.Next(mWeapons.Length));

            Array rWeapons = Enum.GetValues(typeof(RangeWeaponTypes));
            Random rRnd = new Random();
            rangeWeapon = (RangeWeaponTypes)rWeapons.GetValue(rRnd.Next(rWeapons.Length));

            switch (player_Type)
            {
                case CombatTypes.Range:
                    rDamage = ((int)rangeWeapon + 2) * CalcConstants.RANGE_DAMAGE_MULTI;
                    mDamage = (int)meeleWeapon + 1;
                    break;
                case CombatTypes.Meele:
                    mDamage = ((int)meeleWeapon + 2) * CalcConstants.MEELE_DAMAGE_MULTI;
                    rDamage = (int)rangeWeapon + 1;
                    break;
                default:
                    break;
            }
            
            

            Console.WriteLine("# Range Weapon: {0}[{1}]", rangeWeapon, rDamage);
            Console.WriteLine("# Meele Weapon: {0}[{1}]", meeleWeapon, mDamage);
        }
    }
}