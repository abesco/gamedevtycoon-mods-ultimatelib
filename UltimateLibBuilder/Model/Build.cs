using System;
using System.Collections.Generic;
using System.Xml.Serialization;

[Serializable]
public class Build
{
    public Gameplay Gameplay { get; set; }
    public Grid Grid { get; set; }
    public Staff Staff { get; set; }
    public StockMarket StockMarket { get; set; }
    public Story Story { get; set; }
    public Optimizations Optimizations { get; set; }

    public Build()
    {
        this.Gameplay = new Gameplay();
        this.Grid = new Grid();
        this.Staff = new Staff();
        this.StockMarket = new StockMarket();
        this.Story = new Story();
        this.Optimizations = new Optimizations();
    }
}

[Serializable]
public class Optimizations
{
    [XmlAttribute]
    public bool Enabled { get; set; }
    public bool DisableOptimizations { get; set; }
    public bool Compression { get; set; }
    public bool Obfuscation { get; set; }
    public bool IgnoreEval { get; set; }
    public bool PreserveAllSemicolons { get; set; }
}
[Serializable]
public class Gameplay
{
    public string[] Items { get; set; }

    public Gameplay()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class Grid
{
    public string[] Items { get; set; }

    public Grid()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class Staff
{
    public string[] Items { get; set; }

    public Staff()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class StockMarket
{
    public string[] Items { get; set; }

    public StockMarket()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}

[Serializable]
public class Story
{
    public string[] Items { get; set; }

    public Story()
    {
        this.Items = new string[0];
    }

    public void Add(string item)
    {
        var l = new List<string>();
        l.AddRange(this.Items);
        l.Add(item);
        this.Items = l.ToArray();
    }
}