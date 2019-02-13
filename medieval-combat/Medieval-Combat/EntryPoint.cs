using System;
using System.Threading;
using Medieval_Combat.EnumDefinitions;

namespace Medieval_Combat
{
    class EntryPoint
    {
        static Random loopRnd = new Random();
        static void Main(string[] args)
        {
            Character PlayerOne = new Character("P1", Faction.Friendly, CombatTypes.Range );
            Character PlayerTwo = new Character("P2", Faction.Enemy, CombatTypes.Meele);

            while (PlayerOne.IsAlive && PlayerTwo.IsAlive)
            {
                if (loopRnd.Next(0,10) < 5)
                {
                    PlayerOne.Attack(PlayerTwo);
                }
                else
                {
                    PlayerTwo.Attack(PlayerOne);
                }

                Thread.Sleep(150);
            }

            Console.WriteLine("Press X to exit the game...");
            while (Console.ReadKey().Key != ConsoleKey.X) {
                

            }
        }
    }
}
