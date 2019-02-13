using Medieval_Combat.EnumDefinitions;
using Medieval_Combat.Equipment;
using Medieval_Combat.Constants;
using System;

namespace Medieval_Combat
{
    internal class Character
    {
        private Faction faction;
        private string name;
        private bool isAlive;
        public bool IsAlive
        {
            get
            {
                return isAlive;
            }
        }

        private Weapon weapon;
        private Armor armor;

        private int currentHealth;

        public Character(string name, Faction faction, CombatTypes playerType)
        {
            this.name = name;
            this.faction = faction;
            isAlive = true;

            Random rnd = new Random(DateTime.Now.Millisecond);
            int startingHealth = rnd.Next(60, 100);

            switch (playerType)
            {
                case CombatTypes.Range:
                    currentHealth = startingHealth * CalcConstants.RANGE_HP_MULTI;
                    break;
                case CombatTypes.Meele:
                    currentHealth = startingHealth * CalcConstants.MEELE_HP_MUTLI;
                    break;
                default:
                    break;
            }

            switch (playerType)
            {
                case CombatTypes.Range:
                    Console.ForegroundColor = ConsoleColor.DarkCyan;
                    break;
                case CombatTypes.Meele:
                    Console.ForegroundColor = ConsoleColor.DarkRed;
                    break;
                default:
                    break;
            }
            Console.WriteLine("################################################");
            Console.WriteLine("# {0} - {1} ({2} HP) initialized",this.name, playerType, currentHealth);
            weapon = new Weapon(playerType);
            armor = new Armor(playerType);
            Console.WriteLine("################################################\r\n");
            Console.ForegroundColor = ConsoleColor.Gray;
        }

        public void Attack(Character opponent)
        {
            int damage = (weapon.MDamage - opponent.armor.ArmorPoints) + (weapon.RDamage - opponent.armor.ArmorPoints);
            opponent.currentHealth -= damage;

            if (opponent.currentHealth <= 0)
            {
                opponent.isAlive = false;
                Console.WriteLine("\r\n");
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("{0} won.", this.name);
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("{0} lost.", opponent.name);
                Console.ForegroundColor = ConsoleColor.Gray;
                
            }
            else
            {
                
                Console.WriteLine("#{0}({3}) #{1}({4}) | {0} attacked {1} for {2} damage", this.name, opponent.name, damage, this.currentHealth, opponent.currentHealth);
                Console.SetCursorPosition(0, Console.CursorTop - 1);
            }
        }
    }
}